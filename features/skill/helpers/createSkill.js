import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const createSkill = createAsyncThunk(
  "skill/createSkill",
  async ({ skill_title, skill_description }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/skill/create/`, {
        skill_title: skill_title,
        skill_description: skill_description,
      });
      console.log("Response from  create skill", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
