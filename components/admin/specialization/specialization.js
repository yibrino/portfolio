import React, { useState, useEffect } from "react";
import classes from "./specialization.module.css";
import LoadingSpinner from "../../../utlis/loadingSpinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "../../../utlis/getData";
import Table from "../../table/table";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpecializations } from "../../../features/specialization/helpers";

const Specialization = () => {
  const dispatch = useDispatch();
  const { specializations } = useSelector((state) => state.specializations);

  // Use `useEffect` to fetch data on component mount
  useEffect(() => {
    dispatch(getAllSpecializations());
  }, []);

  const columnNamesSpecialization = [
    "careerspecialization_id",
    "team",
    "careerspecialization_description",
    "created_at",
    "updated_at",
  ];

  if (!specializations) {
    return <LoadingSpinner />;
  }
  return (
    <div className={classes.home}>
      <ToastContainer />
      <Table
        editPage="editSpecialization"
        action={() => dispatch(getAllSpecializations())}
        rowIdField="careerspecialization_id"
        table="specialization"
        data={specializations}
        columnNames={columnNamesSpecialization}
      />
    </div>
  );
};

export default Specialization;
