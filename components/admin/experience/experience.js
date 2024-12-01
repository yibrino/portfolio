import React, { useState, useEffect } from "react";
import classes from "./experience.module.css";
import LoadingSpinner from "../../../utlis/loadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "../../../utlis/getData";
import Table from "../../table/table";
import { getAllExperiences } from "../../../features/experience/helpers";
import { useDispatch, useSelector } from "react-redux";

const Experience = () => {
  const dispatch = useDispatch();
  const { experiences } = useSelector((state) => state.experiences);
  // Use `useEffect` to fetch data on component mount
  useEffect(() => {
    dispatch(getAllExperiences());
  }, [dispatch]);

  const columnNamesExperience = [
    "workexperience_id",
    "team",
    "workexperience_company_name",
    "workexperience_company_location",
    "workexperience_company_country",
    "workexperience_position",
    "workexperience_description",
    "workexperience_from_date",
    "workexperience_to_date",
    "created_at",
    "updated_at",
  ];

  if (!experiences) {
    return <LoadingSpinner />;
  }
  return (
    <div className={classes.home}>
      <ToastContainer />
      <Table
        editPage="editExperience"
        action={() => dispatch(getAllExperiences())}
        rowIdField="workexperience_id"
        table="experience"
        data={experiences}
        columnNames={columnNamesExperience}
      />
    </div>
  );
};

export default Experience;
