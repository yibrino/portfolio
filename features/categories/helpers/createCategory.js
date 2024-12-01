import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async ({ category_name, category_slug }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/category/create/`, {
        category_name: category_name,
        category_slug: category_slug,
      });
      console.log("Response from  create category", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
