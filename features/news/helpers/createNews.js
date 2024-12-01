import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const createNews = createAsyncThunk(
  "news/createNews",
  async (
    { news_title, news_img_url, news_content, category },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${baseUrl}/news/create/`, {
        news_title: news_title,
        news_img_url: news_img_url,
        news_content: news_content,
        category: category,
      });
      console.log("Response from  create new", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
