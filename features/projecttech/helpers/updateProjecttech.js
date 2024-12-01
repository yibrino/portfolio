import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const updateProjecttech = createAsyncThunk(
  "projecttech/updateProjecttech",
  async (
    { projecttech_id, projecttech_category, projecttech_description },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${baseUrl}/projecttech/update/${projecttech_id}/`,
        {
          projecttech_category: projecttech_category,
          projecttech_description: projecttech_description,
        }
      );
      console.log("Response from  update projecttech", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
