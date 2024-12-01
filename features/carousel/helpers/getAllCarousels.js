import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const getAllCarousels = createAsyncThunk(
  "carousel/getAllCarousels",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/carousels/`);
      console.log("Response from  carousels", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
