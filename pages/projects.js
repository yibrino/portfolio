import React, { useState, useEffect } from "react";
import LoadingSpinner from "../utlis/loadingSpinner";
import styles from "../styles/projects.module.css";
import Project from "../components/project/project";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../features/projects/helpers";
const Projects = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);
  console.log("Projects", projects);

  // Use `useEffect` to fetch data on component mount
  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  // Display a loading state until the projects data is fetched
  if (!projects) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.profileprofile}>
      <div>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Project
              id={project.project_id}
              key={project.project_id}
              {...project}
            />
          ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default Projects;
