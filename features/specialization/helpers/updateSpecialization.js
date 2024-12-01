import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const updateSpecialization = createAsyncThunk(
  "specialization/updateSpecialization",
  async (
    { careerspecialization_description, careerspecialization_id },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${baseUrl}/specialization/update/${careerspecialization_id}/`,
        {
          careerspecialization_description: careerspecialization_description,
        }
      );
      console.log("Response from  update specialization", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
