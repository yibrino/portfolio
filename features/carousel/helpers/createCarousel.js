import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const createCarousel = createAsyncThunk(
  "carousel/createCarousel",
  async (
    { carousel_alt, carousel_caption, carousel_url },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${baseUrl}/carousel/create/`, {
        carousel_alt: carousel_alt,
        carousel_caption: carousel_caption,
        carousel_url: carousel_url,
      });
      console.log("Response from  create carousel", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
