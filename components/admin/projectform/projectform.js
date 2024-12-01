import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillImageFill } from "react-icons/bs";
import styles from "./projectform.module.css";
import {
  getAllProjects,
  createProject,
  updateProject,
} from "../../../features/projects/helpers";
import { successMessage } from "../../../utlis/sucessMessage";
import { useRouter } from "next/router";

export default function ProjecttechForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { projects } = useSelector((state) => state.projects);

  const [projectTitle, setProjectTitle] = useState("");
  const [projectYoutubeUrl, setProjectYoutubeUrl] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  useEffect(() => {
    if (id && projects) {
      const selectedProject = projects.find(
        (project) => project.project_id == id
      );
      if (selectedProject) {
        setProjectTitle(selectedProject.project_title);
        setProjectYoutubeUrl(selectedProject.project_youtube_url);
        setProjectDescription(selectedProject.project_description);
      }
    }
  }, [id, projects]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!projectTitle || !projectYoutubeUrl || !projectDescription) {
      toast.error("All fields are required");
      return;
    }
    if (id) {
      dispatch(
        updateProject({
          project_id: id,
          project_title: projectTitle,
          project_youtube_url: projectYoutubeUrl,
          project_description: projectDescription,
        })
      )
        .then(() => {
          // Fetch the updated project list
          return dispatch(getAllProjects());
        })
        .then(() => {
          // Show the success message after fetching updated data
          successMessage("Project updated successfully!");
        })
        .catch((error) => {
          // Handle any errors during update or fetch
          toast.error("Failed to update Project. Please try again.");
          console.error("Error updating Project:", error);
        });
    } else {
      dispatch(
        createProject({
          project_title: projectTitle,
          project_youtube_url: projectYoutubeUrl,
          project_description: projectDescription,
        })
      )
        .then(() => {
          dispatch(getAllProjects());
        })
        .then(() => {
          // Show the success message after  Created data
          successMessage("Project Created successfully!");
        });
    }

    router.push("/admin/projects");
  };

  return (
    <div className={styles.newCarousel}>
      <h1 className={styles.newCarouselTitle}>
        {id ? "Edit Project" : "Create Project"}
      </h1>

      <form
        className={styles.newCarouselForm}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* Alternative Text */}
        <div className={styles.newCarouselItem}>
          <label>Project Title</label>
          <input
            className={styles.carouselInput}
            type="text"
            placeholder="Write the title of the project"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
        </div>
        {/* Alternative Text */}
        <div className={styles.newCarouselItem}>
          <label>Project Youtube URL</label>
          <input
            className={styles.carouselInput}
            type="text"
            placeholder="Write the youtube url for the project"
            value={projectYoutubeUrl}
            onChange={(e) => setProjectYoutubeUrl(e.target.value)}
          />
        </div>

        {/* Caption */}
        <div className={styles.newCarouselItem}>
          <label>Project Description </label>
          <textarea
            className={styles.carouselInput}
            placeholder="Write a description about the project"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Submit */}
        <button className={styles.newCarouselButton} type="submit">
          {id ? "Update Project" : "Create Project"}
        </button>
      </form>
    </div>
  );
}
