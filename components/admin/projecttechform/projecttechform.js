import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import styles from "../../../styles/commonform.module.css";

import { successMessage } from "../../../utlis/sucessMessage";
import {
  createProjecttech,
  getAllProjecttechs,
  updateProjecttech,
} from "../../../features/projecttech/helpers";
import { getAllProjects } from "../../../features/projects/helpers";

export default function ProjecttechForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query; //
  const { projecttechs } = useSelector((state) => state.projecttechs);
  const { projects } = useSelector((state) => state.projects);

  const [projecttechCategory, setProjecttechCategory] = useState("");
  const [projecttechDescription, setProjecttechDescription] = useState("");
  const [project, setProject] = useState("");

  useEffect(() => {
    // Fetch projecttech
    dispatch(getAllProjecttechs());
    dispatch(getAllProjects());
  }, [dispatch]);
  console.log("projecttech", projecttechs);

  useEffect(() => {
    if (id) {
      const selectedProjecttech = projecttechs.find(
        (projecttech) => projecttech.projecttech_id == id
      );
      if (selectedProjecttech) {
        setProjecttechCategory(selectedProjecttech.projecttech_category);
        setProjecttechDescription(selectedProjecttech.projecttech_description);
        setProject(selectedProjecttech.project);
      }
    }
  }, [id, projecttechs]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!projecttechCategory || !projecttechDescription) {
      toast.error("All required fields must be filled!");
      return;
    }

    if (id) {
      dispatch(
        updateProjecttech({
          projecttech_category: projecttechCategory,
          projecttech_description: projecttechDescription,
          projecttech_id: id,
        })
      )
        .then(() => {
          dispatch(getAllProjecttechs());
          successMessage("Projecttech updated successfully!");
        })
        .catch((error) => {
          toast.error("Failed to update Projecttech!");
          console.error("Error updating Projecttech:", error);
        });
    } else {
      dispatch(
        createProjecttech({
          project: project,
          projecttech_category: projecttechCategory,
          projecttech_description: projecttechDescription,
        })
      )
        .then(() => {
          dispatch(getAllProjecttechs());
          successMessage("Projecttech created successfully!");
        })
        .catch((error) => {
          toast.error("Failed to create Projecttech!");
          console.error("Error creating Projecttech:", error);
        });
    }

    router.push("/admin/projecttech");
  };

  return (
    <div className={styles.formContainer}>
      <h1>{id ? "Edit Projecttech" : "Create Projecttech"}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Projecttech Category</label>
          <input
            type="text"
            name=" projecttech_category"
            value={projecttechCategory}
            onChange={(e) => setProjecttechCategory(e.target.value)}
            placeholder="Enter Project Category"
          />
        </div>
        <div className={styles.containerItem}>
          <label>Description</label>
          <textarea
            value={projecttechDescription}
            onChange={(e) => setProjecttechDescription(e.target.value)}
            placeholder="Enter the Description here"
          ></textarea>
        </div>
        <div className={styles.containerItem}>
          <label>Project</label>
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            required
            disabled={!!id}
          >
            <option value="">Select a project</option>
            {projects &&
              projects.map((project) => (
                <option key={project.project_id} value={project.project_id}>
                  {project.project_title}
                </option>
              ))}
          </select>
        </div>

        <button className={styles.Button} type="submit">
          {id ? "Update Projettech" : "Create Projecttech"}
        </button>
      </form>
    </div>
  );
}
