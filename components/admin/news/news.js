import React, { useState, useEffect } from "react";
import classes from "./news.module.css";
import LoadingSpinner from "../../../utlis/loadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "../../../utlis/getData";
import Table from "../../table/table";
import { getAllNews } from "../../../features/news/helpers";
import { useDispatch, useSelector } from "react-redux";

const News = () => {
  const dispatch = useDispatch();
  const { news } = useSelector((state) => state.news);

  // Use `useEffect` to fetch data on component mount
  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  const columnNamesNew = [
    "news_id",
    "category",
    "news_title",
    "news_content",
    "created_at",
    "updated_at",
  ];

  if (!news) {
    return <LoadingSpinner />;
  }
  return (
    <div className={classes.home}>
      <ToastContainer />
      <Table
        action={() => dispatch(getAllNews())}
        editPage="editNews"
        table="news"
        rowIdField="news_id"
        data={news}
        columnNames={columnNamesNew}
      />
    </div>
  );
};

export default News;
