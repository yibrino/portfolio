import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillImageFill } from "react-icons/bs";
import styles from "./newcarousel.module.css";
import {
  createCarousel,
  updateCarousel,
  getAllCarousels,
} from "../../../features/carousel/helpers";
import { successMessage } from "../../../utlis/sucessMessage";
import { useRouter } from "next/router";

export default function NewCarousel() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { carousels } = useSelector((state) => state.carousels);

  const [carouselAlt, setCarouselAlt] = useState("");
  const [carouselCaption, setCarouselCaption] = useState("");
  const [carouselUrl, setCarouselUrl] = useState("");
  const [carouselImage, setCarouselImage] = useState("");

  const [isInitialized, setIsInitialized] = useState(false);

  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/daklnsxdc/image/upload";

  useEffect(() => {
    dispatch(getAllCarousels());
  }, [dispatch]);

  useEffect(() => {
    if (id && carousels && !isInitialized) {
      const selectedCarousel = carousels.find(
        (carousel) => carousel.carousel_id == id
      );
      if (selectedCarousel) {
        setCarouselAlt(selectedCarousel.carousel_alt);
        setCarouselCaption(selectedCarousel.carousel_caption);
        setCarouselUrl(selectedCarousel.carousel_url);
        setIsInitialized(true); // Prevent resetting after first initialization
      }
    }
  }, [id, carousels, isInitialized]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file selected");
      return;
    }

    setCarouselImage(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolio");
    formData.append("folder", "portfolio");

    try {
      const res = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorDetails = await res.json();
        toast.error(
          `Failed to upload image: ${
            errorDetails.error?.message || "Unknown error"
          }`
        );
        return;
      }

      const { url } = await res.json();
      setCarouselUrl(url);
      successMessage("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!carouselAlt || !carouselCaption || !carouselUrl) {
      toast.error("All fields are required");
      return;
    }
    if (id) {
      dispatch(
        updateCarousel({
          carousel_id: id,
          carousel_alt: carouselAlt,
          carousel_caption: carouselCaption,
          carousel_url: carouselUrl,
        })
      )
        .then(() => {
          // Fetch the updated carousels list
          return dispatch(getAllCarousels());
        })
        .then(() => {
          // Show the success message after fetching updated data
          successMessage("Carousel updated successfully!");
        })
        .catch((error) => {
          // Handle any errors during update or fetch
          toast.error("Failed to update carousel. Please try again.");
          console.error("Error updating carousel:", error);
        });
    } else {
      dispatch(
        createCarousel({
          carousel_alt: carouselAlt,
          carousel_caption: carouselCaption,
          carousel_url: carouselUrl,
        })
      ).then(() => {
        dispatch(getAllCarousels());
      });
      successMessage("Carousel created successfully!");
    }

    router.push("/admin/home/");
  };

  return (
    <div className={styles.newCarousel}>
      <h1 className={styles.newCarouselTitle}>
        {id ? "Edit Carousel" : "Create Carousel"}
      </h1>

      <form
        className={styles.newCarouselForm}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* Image Upload */}
        <div className={styles.newCarouselItem}>
          <label>Upload Image</label>
          <div className={styles.imagePreviewContainer}>
            {carouselImage ? (
              <img
                src={URL.createObjectURL(carouselImage)}
                alt="preview"
                className={styles.imagePreview}
              />
            ) : carouselUrl ? (
              <img
                src={carouselUrl}
                alt="carousel"
                className={styles.imagePreview}
              />
            ) : (
              <div className={styles.imagePlaceholder}>No image selected</div>
            )}
          </div>
          <label className={styles.fileUploadLabel}>
            <input
              type="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleImageUpload}
            />
            <BsFillImageFill className={styles.uploadIcon} />
          </label>
        </div>

        {/* Alternative Text */}
        <div className={styles.newCarouselItem}>
          <label>Carousel Alt</label>
          <input
            className={styles.carouselInput}
            type="text"
            placeholder="Write Alt text for the Carousel"
            value={carouselAlt}
            onChange={(e) => setCarouselAlt(e.target.value)}
          />
        </div>

        {/* Caption */}
        <div className={styles.newCarouselItem}>
          <label>Carousel Caption</label>
          <textarea
            className={styles.carouselInput}
            placeholder="Write a caption for the carousel"
            value={carouselCaption}
            onChange={(e) => setCarouselCaption(e.target.value)}
          ></textarea>
        </div>

        {/* Submit */}
        <button className={styles.newCarouselButton} type="submit">
          {id ? "Update Carousel" : "Create Carousel"}
        </button>
      </form>
    </div>
  );
}
