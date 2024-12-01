import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";

export const createEducation = createAsyncThunk(
  "education/createEducation",
  async (educationData, { rejectWithValue }) => {
    const {
      team,
      educationbackground_degree_level,
      educationbackground_institution,
      educationbackground_degree_description,
      educationbackground_degree_type,
      educationbackground_from_date,
      educationbackground_to_date,
    } = educationData;

    try {
      const response = await axios.post(
        `${baseUrl}/education/create/${team}/`,
        {
          educationbackground_degree_level,
          educationbackground_institution,
          educationbackground_degree_description,
          educationbackground_degree_type,
          educationbackground_from_date,
          educationbackground_to_date,
        }
      );

      console.log("Response from create education", response);

      if (response.status === 201) {
        return response.data; // Return the created experience data
      }
    } catch (error) {
      console.error("Error creating education:", error);
      return rejectWithValue(
        error.response?.data?.errors?.[0] || "Failed to create education"
      );
    }
  }
);
