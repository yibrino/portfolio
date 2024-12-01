import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const updateSkill = createAsyncThunk(
  "skill/updateSkill",
  async ({ skill_id, skill_title, skill_description }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseUrl}/skill/update/${skill_id}/`, {
        skill_title: skill_title,
        skill_description: skill_description,
      });
      console.log("Response from  update skill", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
