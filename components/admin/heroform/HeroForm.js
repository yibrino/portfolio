import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillImageFill } from "react-icons/bs";
import styles from "./edithero.module.css";
import {
  getAllHeros,
  createHero,
  updateHero,
} from "../../../features/heros/helpers";
import { successMessage } from "../../../utlis/sucessMessage";
import { useRouter } from "next/router";

export default function HeroForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { heros } = useSelector((state) => state.heros);

  const [heroTitle, setHeroTitle] = useState("");
  const [heroUrl, setHeroUrl] = useState("");
  const [heroAbout, setHeroAbout] = useState("");
  const [heroImage, setHeroImage] = useState("");

  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/daklnsxdc/image/upload";

  useEffect(() => {
    dispatch(getAllHeros());
  }, [dispatch]);

  useEffect(() => {
    if (id && heros) {
      const selectedHero = heros.find((hero) => hero.hero_id == id);
      if (selectedHero) {
        setHeroTitle(selectedHero.hero_title);
        setHeroUrl(selectedHero.hero_img_url);
        setHeroAbout(selectedHero.hero_about);
      }
    }
  }, [id, heros]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file selected");
      return;
    }

    setHeroImage(file);

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
      setHeroUrl(url);
      successMessage("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!heroTitle || !heroAbout || !heroUrl) {
      toast.error("All fields are required");
      return;
    }
    if (id) {
      dispatch(
        updateHero({
          hero_id: id,
          hero_title: heroTitle,
          hero_img_url: heroUrl,
          hero_about: heroAbout,
        })
      )
        .then(() => {
          // Fetch the updated hero list
          return dispatch(getAllHeros());
        })
        .then(() => {
          // Show the success message after fetching updated data
          successMessage("Hero updated successfully!");
        })
        .catch((error) => {
          // Handle any errors during update or fetch
          toast.error("Failed to update Hero. Please try again.");
          console.error("Error updating Hero:", error);
        });
    } else {
      dispatch(
        createHero({
          hero_title: heroTitle,
          hero_img_url: heroUrl,
          hero_about: heroAbout,
        })
      )
        .then(() => {
          dispatch(getAllHeros());
        })
        .then(() => {
          // Show the success message after  Created data
          successMessage("Hero Created successfully!");
        });
    }

    router.push("/admin/home/");
  };

  return (
    <div className={styles.newCarousel}>
      <h1 className={styles.newCarouselTitle}>
        {id ? "Edit Hero" : "Create Hero"}
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
            {heroImage ? (
              <img
                src={URL.createObjectURL(heroImage)}
                alt="preview"
                className={styles.imagePreview}
              />
            ) : heroUrl ? (
              <img
                src={heroUrl}
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
          <label>Hero Title</label>
          <input
            className={styles.carouselInput}
            type="text"
            placeholder="Write the title of the hero"
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
          />
        </div>

        {/* Caption */}
        <div className={styles.newCarouselItem}>
          <label>Hero About</label>
          <textarea
            className={styles.carouselInput}
            placeholder="Write about us  for the hero"
            value={heroAbout}
            onChange={(e) => setHeroAbout(e.target.value)}
          ></textarea>
        </div>

        {/* Submit */}
        <button className={styles.newCarouselButton} type="submit">
          {id ? "Update hero" : "Create hero"}
        </button>
      </form>
    </div>
  );
}
