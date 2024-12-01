import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";

export const removeLike = createAsyncThunk(
  "like/removeLike",
  async ({ like_id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/like/${like_id}/`);
      console.log("Response like", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
