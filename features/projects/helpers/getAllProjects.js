import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const getAllProjects = createAsyncThunk(
  "projects/getAllProjects",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/projects/`);
      console.log("Response from  projects", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
