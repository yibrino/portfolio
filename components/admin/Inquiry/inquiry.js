import React, { useState, useEffect } from "react";
import classes from "./inquiry.module.css";
import LoadingSpinner from "../../../utlis/loadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "../../../utlis/getData";
import Table from "../../table/table";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages } from "../../../features/mesage/helpers";
const Inquiry = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);
  console.log("Inquiries", messages);
  // Use `useEffect` to fetch data on component mount
  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  const columnNamesInquiry = [
    "message_id",
    "message_fullname",
    "message_email",
    "message_category",
    "message_content",
    "created_at",
    "updated_at",
  ];

  if (!messages) {
    return <LoadingSpinner />;
  }
  return (
    <div className={classes.home}>
      <ToastContainer />
      <Table
        action={() => dispatch(getAllMessages())}
        rowIdField="message_id"
        table="message"
        data={messages}
        columnNames={columnNamesInquiry}
      />
    </div>
  );
};

export default Inquiry;
