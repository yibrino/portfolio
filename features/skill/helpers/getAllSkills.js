import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const getAllSkills = createAsyncThunk(
  "skills/getAllSkills",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/skills/`);
      console.log("Response from  skills", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
