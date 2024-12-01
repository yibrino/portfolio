import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import styles from "../../../styles/commonform.module.css";
import {
  createPage,
  getAllPages,
  updatePage,
} from "../../../features/pages/helpers";
import { successMessage } from "../../../utlis/sucessMessage";

export default function PageForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query; //
  const { pages } = useSelector((state) => state.pages);
  const [pageLabel, setPageLabel] = useState("");
  const [pageLink, setPageLink] = useState("");

  useEffect(() => {
    // Fetch pages
    dispatch(getAllPages());
  }, [dispatch]);
  console.log("pages", pages);

  useEffect(() => {
    if (id) {
      const selectedPage = pages.find((page) => page.page_id == id);
      if (selectedPage) {
        setPageLabel(selectedPage.page_label);
        setPageLink(selectedPage.page_link);
      }
    }
  }, [id, pages]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pageLabel || !pageLink) {
      toast.error("All required fields must be filled!");
      return;
    }

    if (id) {
      dispatch(
        updatePage({ page_label: pageLabel, page_link: pageLink, page_id: id })
      )
        .then(() => {
          dispatch(getAllPages());
          successMessage("Page updated successfully!");
        })
        .catch((error) => {
          toast.error("Failed to update page!");
          console.error("Error updating page:", error);
        });
    } else {
      dispatch(createPage({ page_label: pageLabel, page_link: pageLink }))
        .then(() => {
          dispatch(getAllPages());
          successMessage("Page created successfully!");
        })
        .catch((error) => {
          toast.error("Failed to create page!");
          console.error("Error creating page:", error);
        });
    }

    router.push("/admin/page");
  };

  return (
    <div className={styles.formContainer}>
      <h1>{id ? "Edit Page" : "Create Page"}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Page Label</label>
          <input
            type="text"
            name="page_label"
            value={pageLabel}
            onChange={(e) => setPageLabel(e.target.value)}
            placeholder="Enter page label"
          />
        </div>
        <div className={styles.containerItem}>
          <label>Page Link</label>
          <input
            type="text"
            name="page_link"
            value={pageLink}
            onChange={(e) => setPageLink(e.target.value)}
            placeholder="Enter page link"
          />
        </div>

        <button className={styles.Button} type="submit">
          {id ? "Update Page" : "Create Page"}
        </button>
      </form>
    </div>
  );
}
