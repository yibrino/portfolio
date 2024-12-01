import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const createPage = createAsyncThunk(
  "page/createPage",
  async ({ page_label, page_link }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/page/create/`, {
        page_label: page_label,
        page_link: page_link,
      });
      console.log("Response from  create page", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
