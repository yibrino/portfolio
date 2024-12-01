import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillImageFill } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import styles from "../../../styles/commonform.module.css";

import {
  getAllNews,
  createNews,
  updateNews,
} from "../../../features/news/helpers";

import { getAllCategories } from "../../../features/categories/helpers";
import { successMessage } from "../../../utlis/sucessMessage";

export default function NewsForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query; // Fetch the news ID from the URL
  const { news } = useSelector((state) => state.news);
  const { categories } = useSelector((state) => state.categories);

  const [newsTitle, setNewsTitle] = useState("");
  const [newsUrl, setNewsUrl] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [newsCategory, setNewsCategory] = useState("");

  const cloudinaryUrl =
    "https://api.cloudinary.com/v1_1/daklnsxdc/image/upload";

  useEffect(() => {
    dispatch(getAllNews());
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (id && news) {
      const selectedNews = news.find((newsItem) => newsItem.news_id == id);
      if (selectedNews) {
        setNewsTitle(selectedNews.news_title);
        setNewsUrl(selectedNews.news_img_url);
        setNewsContent(selectedNews.news_content);
        setNewsCategory(selectedNews.category);
      }
    }
  }, [id, news]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file selected");
      return;
    }

    setNewsImage(file);

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
      setNewsUrl(url);
      successMessage("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("news title", newsTitle);
    console.log("news Url", newsUrl);
    console.log("news content", newsContent);
    console.log("news category", newsCategory);

    if (!newsTitle || !newsUrl || !newsContent || !newsCategory) {
      toast.error("All required fields must be filled!");
      return;
    }

    if (id) {
      dispatch(
        updateNews({
          news_id: id,
          news_title: newsTitle,
          news_img_url: newsUrl,
          news_content: newsContent,
          category: newsCategory,
        })
      )
        .then(() => {
          dispatch(getAllNews());
          successMessage("News updated successfully!");
          router.push("/admin/news");
        })
        .catch((error) => {
          toast.error("Failed to update news!");
          console.error("Error updating news:", error);
        });
    } else {
      dispatch(
        createNews({
          news_title: newsTitle,
          news_img_url: newsUrl,
          news_content: newsContent,
          category: newsCategory,
        })
      )
        .then(() => {
          dispatch(getAllNews());
          successMessage("News created successfully!");
          router.push("/admin/news");
        })
        .catch((error) => {
          toast.error("Failed to create news!");
          console.error("Error creating news:", error);
        });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>{id ? "Edit News" : "Create News"}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Upload Image</label>
          <div className={styles.imagePreviewContainer}>
            {newsImage ? (
              <img
                src={URL.createObjectURL(newsImage)}
                alt="preview"
                className={styles.imagePreview}
              />
            ) : newsUrl ? (
              <img src={newsUrl} alt="news" className={styles.imagePreview} />
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
        <div className={styles.containerItem}>
          <label>News Title</label>
          <input
            type="text"
            value={newsTitle}
            onChange={(e) => setNewsTitle(e.target.value)}
            placeholder="Enter the title for News"
          />
        </div>
        <div className={styles.containerItem}>
          <label>Content</label>
          <textarea
            value={newsContent}
            onChange={(e) => setNewsContent(e.target.value)}
            placeholder="Enter the content here"
          ></textarea>
        </div>
        <div className={styles.containerItem}>
          <label>Category</label>
          <select
            value={newsCategory}
            onChange={(e) => setNewsCategory(e.target.value)}
            required
            disabled={!!id}
          >
            <option value="">Select a category</option>
            {categories &&
              categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
          </select>
        </div>
        <button className={styles.Button} type="submit">
          {id ? "Update News" : "Create News"}
        </button>
      </form>
    </div>
  );
}
