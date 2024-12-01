import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillImageFill } from "react-icons/bs";
import styles from "./newhero.module.css";
import { createHero } from "../../../features/heros/helpers";
import { successMessage } from "../../../utlis/sucessMessage";
import { useRouter } from "next/router";
export default function NewHero() {
  const router = useRouter();
  const [heroTile, setHeroTitle] = useState("");
  const [heroAbout, setHeroAbout] = useState("");
  const [heroImgUrl, setHeroImgUrl] = useState("");
  const [heroImage, setHeroImage] = useState("");

  const dispatch = useDispatch();
  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/daklnsxdc/image/upload";
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.log("No file selected");
      return;
    }

    setHeroImage(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolio"); // Ensure this preset exists in Cloudinary
    formData.append("folder", "portfolio");

    try {
      const res = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorDetails = await res.json();
        console.error("Cloudinary Error:", errorDetails);
        toast.error(
          `Failed to upload image: ${
            errorDetails.error?.message || "Unknown error"
          }`
        );
        return;
      }

      const { url } = await res.json();
      setHeroImgUrl(url);
      console.log("Image Url", url);
      successMessage("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      toast.error("Failed to upload image");
    }
  };

  const CreateHeroHandler = (e) => {
    e.preventDefault();
    console.log("heroUrl", heroImgUrl);

    if (heroTile && heroAbout && heroImgUrl) {
      // Dispatch the action to add a new hero
      dispatch(
        createHero({
          hero_title: heroTile,
          hero_about: heroAbout,
          hero_img_url: heroImgUrl,
        })
      );
      successMessage("Hero created successfully!");
      router.push("/admin/home/");
    } else {
      toast.error("All fields are required");
    }
  };

  return (
    <div className={styles.newCarousel}>
      <h1 className={styles.newCarouselTitle}>Create New Hero</h1>

      <form
        className={styles.newCarouselForm}
        onSubmit={CreateHeroHandler}
        encType="multipart/form-data"
      >
        {/* Image Upload Section */}
        <div className={styles.newCarouselItem}>
          <label>Upload Image</label>
          <div className={styles.imagePreviewContainer}>
            {heroImage ? (
              <img
                src={heroImage ? URL.createObjectURL(heroImage) : ""}
                alt="preview"
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
            placeholder="Write the title of  the hero"
            value={heroTile}
            onChange={(e) => setHeroTitle(e.target.value)}
          />
        </div>

        {/* Caption */}
        <div className={styles.newCarouselItem}>
          <label>Hero About</label>
          <textarea
            className={styles.carouselInput}
            placeholder="Write a about for the hero"
            value={heroAbout}
            onChange={(e) => setHeroAbout(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          className={styles.newCarouselButton}
          onClick={CreateHeroHandler}
          type="submit"
        >
          Create Hero
        </button>
      </form>
    </div>
  );
}
