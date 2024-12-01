import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const addLike = createAsyncThunk(
  "like/addLike",
  async ({ news, liked_by }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/like/create/${news}/`, {
        liked_by: liked_by,
      });
      console.log("Response from  add like", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
