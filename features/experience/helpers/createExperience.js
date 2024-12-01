import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";

export const createExperience = createAsyncThunk(
  "experience/createExperience",
  async (experienceData, { rejectWithValue }) => {
    const {
      team,
      workexperience_company_name,
      workexperience_company_location,
      workexperience_company_country,
      workexperience_position,
      workexperience_description,
      workexperience_from_date,
      workexperience_to_date,
    } = experienceData;

    try {
      const response = await axios.post(
        `${baseUrl}/experience/create/${team}/`,
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

      console.log("Response from create experience", response);

      if (response.status === 201) {
        return response.data; // Return the created experience data
      }
    } catch (error) {
      console.error("Error creating experience:", error);
      return rejectWithValue(
        error.response?.data?.errors?.[0] || "Failed to create experience"
      );
    }
  }
);
