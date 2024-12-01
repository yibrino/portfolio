import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";

export const updateExperience = createAsyncThunk(
  "experience/updateExperience",
  async (experienceData, { rejectWithValue }) => {
    const {
      workexperience_id,
      workexperience_company_name,
      workexperience_company_location,
      workexperience_company_country,
      workexperience_position,
      workexperience_description,
      workexperience_from_date,
      workexperience_to_date,
    } = experienceData;

    try {
      const response = await axios.put(
        `${baseUrl}/experience/update/${workexperience_id}/`,
        {
          workexperience_company_name,
          workexperience_company_location,
          workexperience_company_country,
          workexperience_position,
          workexperience_description,
          workexperience_from_date,
          workexperience_to_date,
        }
      );

      console.log("Response from update experience", response);

      if (response.status === 200) {
        return response.data; // Return the updated experience data
      }
    } catch (error) {
      console.error("Error updating experience:", error);
      return rejectWithValue(
        error.response?.data?.errors?.[0] || "Failed to update experience"
      );
    }
  }
);
