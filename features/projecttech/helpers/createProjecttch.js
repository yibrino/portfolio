import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const createProjecttech = createAsyncThunk(
  "projecttech/createProjecttech",
  async (
    { project, projecttech_category, projecttech_description },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${baseUrl}/projecttech/create/${project}/`,
        {
          projecttech_category: projecttech_category,
          projecttech_description: projecttech_description,
        }
      );
      console.log("Response from  create projecttech", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
