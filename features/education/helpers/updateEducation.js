import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";

export const updateEducation = createAsyncThunk(
  "education/updateEducation",
  async (educationData, { rejectWithValue }) => {
    const {
      educationbackground_id,
      educationbackground_degree_level,
      educationbackground_institution,
      educationbackground_degree_description,
      educationbackground_degree_type,
      educationbackground_from_date,
      educationbackground_to_date,
    } = educationData;

    try {
      const response = await axios.put(
        `${baseUrl}/education/update/${educationbackground_id}/`,
        {
          educationbackground_degree_level,
          educationbackground_institution,
          educationbackground_degree_description,
          educationbackground_degree_type,
          educationbackground_from_date,
          educationbackground_to_date,
        }
      );

      console.log("Response from update education", response);

      if (response.status === 200) {
        return response.data; // Return the updated experience data
      }
    } catch (error) {
      console.error("Error updating education:", error);
      return rejectWithValue(
        error.response?.data?.errors?.[0] || "Failed to update education"
      );
    }
  }
);
