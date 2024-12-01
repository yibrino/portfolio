import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/categories/`);
      console.log("Response categories", response);
      const data = response.data;

      if (response.status === 200) {
        return data; // Return categories if available
      } else {
        throw new Error("No data returned from getData");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      return rejectWithValue(error.message || "Failed to fetch categories");
    }
  }
);
