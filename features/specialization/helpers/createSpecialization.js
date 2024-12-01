import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const createSpecialization = createAsyncThunk(
  "specialization/createSpecialization",
  async ({ careerspecialization_description, team }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/specialization/create/${team}/`,
        {
          careerspecialization_description: careerspecialization_description,
        }
      );
      console.log("Response from  create specialization", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
