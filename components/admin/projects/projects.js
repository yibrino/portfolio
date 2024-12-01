import React, { useState, useEffect } from "react";
import classes from "./projects.module.css";
import LoadingSpinner from "../../../utlis/loadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../../table/table";
import { getAllProjects } from "../../../features/projects/helpers";
import { useDispatch, useSelector } from "react-redux";

const Projects = () => {
  const dispatch = useDispatch();

  const { projects } = useSelector((state) => state.projects);

  // Use `useEffect` to fetch data on component mount
  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const columnNamesProject = [
    "project_id",
    "project_title",
    "project_description",
    "project_youtube_url",
    "created_at",
    "updated_at",
  ];

  if (!projects) {
    return <LoadingSpinner />;
  }
  return (
    <div className={classes.home}>
      <ToastContainer />
      <Table
        action={() => dispatch(getAllProjects())}
        editPage="editProject"
        rowIdField="project_id"
        table="project"
        data={projects}
        columnNames={columnNamesProject}
      />
    </div>
  );
};

export default Projects;
