import React, { useState, useEffect } from "react";
import classes from "./projecttech.module.css";
import LoadingSpinner from "../../../utlis/loadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../../table/table";
import { getAllProjecttechs } from "../../../features/projecttech/helpers";
import { useDispatch, useSelector } from "react-redux";

const Projects = () => {
  const dispatch = useDispatch();

  const { projecttechs } = useSelector((state) => state.projecttechs);

  // Use `useEffect` to fetch data on component mount
  useEffect(() => {
    dispatch(getAllProjecttechs());
  }, [dispatch]);

  const columnNamesProjecttech = [
    "projecttech_id",
    "project",
    "projecttech_category",
    "projecttech_description",
    "created_at",
    "updated_at",
  ];

  if (!projecttechs) {
    return <LoadingSpinner />;
  }
  return (
    <div className={classes.home}>
      <ToastContainer />
      <Table
        action={() => dispatch(getAllProjecttechs())}
        editPage="editProjecttech"
        rowIdField="projecttech_id"
        table="projecttech"
        data={projecttechs}
        columnNames={columnNamesProjecttech}
      />
    </div>
  );
};

export default Projects;
