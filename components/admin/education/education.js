import React, { useState, useEffect } from "react";
import classes from "./education.module.css";
import LoadingSpinner from "../../../utlis/loadingSpinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../../table/table";
import { getAllEducations } from "../../../features/education/helpers";
import { useDispatch, useSelector } from "react-redux";

const Education = () => {
  const dispatch = useDispatch();
  const { educations } = useSelector((state) => state.educations);
  // Use `useEffect` to fetch data on component mount
  useEffect(() => {
    dispatch(getAllEducations());
  }, []);

  const columnNamesEducation = [
    "educationbackground_id",
    "team",
    "educationbackground_degree_level",
    "educationbackground_institution",
    "educationbackground_degree_description",
    "educationbackground_degree_type",
    "educationbackground_from_date",
    "educationbackground_to_date",
    "created_at",
    "updated_at",
  ];

  if (!educations) {
    return <LoadingSpinner />;
  }
  return (
    <div className={classes.home}>
      <ToastContainer />
      <Table
        editPage="editEducation"
        action={() => dispatch(getAllEducations())}
        rowIdField="educationbackground_id"
        table="education"
        data={educations}
        columnNames={columnNamesEducation}
      />
    </div>
  );
};

export default Education;
