import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const createMessage = createAsyncThunk(
  "message/createMessage",
  async (
    { message_fullname, message_category, message_email, message_content },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${baseUrl}/message/create/`, {
        message_fullname: message_fullname,
        message_category: message_category,
        message_email: message_email,
        message_content: message_content,
      });
      console.log("Response from  create message", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
