import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async ({ comment_id, comment_content }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseUrl}/comment/update/${comment_id}/`,
        {
          comment_content: comment_content,
        }
      );
      console.log("Response from  update comment", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
