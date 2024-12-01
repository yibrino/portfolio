import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const getAllNews = createAsyncThunk(
  "news/getAllNews",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/news/`);
      console.log("Response from  news", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
