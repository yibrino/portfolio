import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ news, commented_by, comment_content }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/comment/create/${news}/`, {
        commented_by: commented_by,
        comment_content: comment_content,
      });
      console.log("Response from  create comment", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
