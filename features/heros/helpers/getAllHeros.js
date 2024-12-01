import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const getAllHeros = createAsyncThunk(
  "heros/getAllHeros",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/heros/`);
      console.log("Response from  heros", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
