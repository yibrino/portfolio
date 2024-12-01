import React, { useState, useEffect } from "react";
import classes from "./categories.module.css";
import LoadingSpinner from "../../../utlis/loadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../../table/table";
import { getAllCategories } from "../../../features/categories/helpers";
import { useDispatch, useSelector } from "react-redux";

const Categoires = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);

  // Use `useEffect` to fetch data on component mount
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const columnNamesCategory = ["category_id", "category_name", "category_slug"];

  if (!categories) {
    return <LoadingSpinner />;
  }
  return (
    <div className={classes.home}>
      <ToastContainer />
      <Table
        action={() => dispatch(getAllCategories())}
        editPage="editCategory"
        rowIdField="category_id"
        table="category"
        data={categories}
        columnNames={columnNamesCategory}
      />
    </div>
  );
};

export default Categoires;
