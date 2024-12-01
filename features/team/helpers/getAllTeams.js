import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const getAllTeams = createAsyncThunk(
  "team/getAllTeams",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/teams/`);
      console.log("Response from  teams", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
