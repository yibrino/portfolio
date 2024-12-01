import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const updateHero = createAsyncThunk(
  "hero/updateHero",
  async (
    { hero_id, hero_title, hero_about, hero_img_url },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${baseUrl}/hero/update/${hero_id}/`, {
        hero_title: hero_title,
        hero_about: hero_about,
        hero_img_url: hero_img_url,
      });
      console.log("Response from  update hero", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
