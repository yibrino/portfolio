import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getData } from "../../../utlis/getData";
export const getAllPages = createAsyncThunk(
  "page/getPages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData("pages");
      console.log("Response pages", response);

      if (response) {
        return response; // Return categories if available
      } else {
        throw new Error("No data returned from pages");
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
      return rejectWithValue(error.message || "Failed to fetch pages");
    }
  }
);
