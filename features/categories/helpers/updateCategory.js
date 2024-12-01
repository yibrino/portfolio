import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (
    { category_id, category_name, category_slug },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${baseUrl}/category/update/${category_id}/`,
        {
          category_name: category_name,
          category_slug: category_slug,
        }
      );
      console.log("Response from  update category", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
