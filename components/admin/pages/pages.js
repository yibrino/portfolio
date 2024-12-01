import React, { useState, useEffect } from "react";
import classes from "./pages.module.css";
import LoadingSpinner from "../../../utlis/loadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../../table/table";
import { getAllPages } from "../../../features/pages/helpers";
import { useDispatch, useSelector } from "react-redux";

const Pages = () => {
  const dispatch = useDispatch();

  const { pages } = useSelector((state) => state.pages);

  // Use `useEffect` to fetch data on component mount
  useEffect(() => {
    dispatch(getAllPages());
  }, [dispatch]);

  const columnNamesPage = ["page_id", "page_label", "page_link"];

  if (!pages) {
    return <LoadingSpinner />;
  }
  return (
    <div className={classes.home}>
      <ToastContainer />
      <Table
        action={() => dispatch(getAllPages())}
        editPage="editPage"
        rowIdField="page_id"
        table="page"
        data={pages}
        columnNames={columnNamesPage}
      />
    </div>
  );
};

export default Pages;
