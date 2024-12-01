import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const updateCarousel = createAsyncThunk(
  "carousel/updateCarousel",
  async (
    { carousel_id, carousel_alt, carousel_caption, carousel_url },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${baseUrl}/carousel/update/${carousel_id}/`,
        {
          carousel_alt: carousel_alt,
          carousel_caption: carousel_caption,
          carousel_url: carousel_url,
        }
      );
      console.log("Response from  update carousel", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
