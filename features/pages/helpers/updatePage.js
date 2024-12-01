import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const updatePage = createAsyncThunk(
  "page/updatePage",
  async ({ page_id, page_label, page_link }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseUrl}/page/update/${page_id}/`, {
        page_label: page_label,
        page_link: page_link,
      });
      console.log("Response from  update page", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
