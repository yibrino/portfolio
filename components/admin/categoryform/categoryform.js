import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import styles from "../../../styles/commonform.module.css";
import {
  createCategory,
  updateCategory,
  getAllCategories,
} from "../../../features/categories/helpers";
import { successMessage } from "../../../utlis/sucessMessage";

export default function CategoryForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query; //
  const { categories } = useSelector((state) => state.categories);
  const [categoryName, setCategoryName] = useState("");
  const [categorySlug, setCategorySlug] = useState("");

  useEffect(() => {
    // Fetch categories
    dispatch(getAllCategories());
  }, [dispatch]);
  console.log("categories", categories);

  useEffect(() => {
    if (id) {
      const selectedCategory = categories.find(
        (category) => category.category_id == id
      );
      if (selectedCategory) {
        setCategoryName(selectedCategory.categoryName);
        setCategorySlug(selectedCategory.categorySlug);
      }
    }
  }, [id, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName || !categorySlug) {
      toast.error("All required fields must be filled!");
      return;
    }

    if (id) {
      dispatch(
        updateCategory({
          category_name: categoryName,
          category_slug: categorySlug,
          category_id: id,
        })
      )
        .then(() => {
          dispatch(getAllCategories());
          successMessage("Category updated successfully!");
        })
        .catch((error) => {
          toast.error("Failed to update category!");
          console.error("Error updating category:", error);
        });
    } else {
      dispatch(
        createCategory({
          category_name: categoryName,
          category_slug: categorySlug,
        })
      )
        .then(() => {
          dispatch(getAllCategories());
          successMessage("Category created successfully!");
        })
        .catch((error) => {
          toast.error("Failed to create category!");
          console.error("Error creating category:", error);
        });
    }

    router.push("/admin/categories");
  };

  return (
    <div className={styles.formContainer}>
      <h1>{id ? "Edit Category" : "Create Category"}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Category Name</label>
          <input
            type="text"
            name="category_name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
          />
        </div>
        <div className={styles.containerItem}>
          <label>Category Slug</label>
          <input
            type="text"
            name="category_slug"
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            placeholder="Enter category slug"
          />
        </div>

        <button className={styles.Button} type="submit">
          {id ? "Update Category" : "Create Category"}
        </button>
      </form>
    </div>
  );
}
