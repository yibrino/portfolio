import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const getAllMessages = createAsyncThunk(
  "messages/getAllMessages",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/messages/`);
      console.log("Response from  Messages", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
