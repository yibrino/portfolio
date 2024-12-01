import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const updateNews = createAsyncThunk(
  "news/updateNews",
  async (
    { news_id, news_title, news_img_url, news_content },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${baseUrl}/news/update/${news_id}/`, {
        news_title: news_title,
        news_img_url: news_img_url,
        news_content: news_content,
      });
      console.log("Response from  update news", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
