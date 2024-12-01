import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const createHero = createAsyncThunk(
  "hero/createHero",
  async ({ hero_title, hero_about, hero_img_url }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/hero/create/`, {
        hero_title: hero_title,
        hero_about: hero_about,
        hero_img_url: hero_img_url,
      });
      console.log("Response from  create hero", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
