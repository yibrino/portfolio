import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const createProject = createAsyncThunk(
  "project/createProject",
  async (
    { project_title, project_description, project_youtube_url },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${baseUrl}/project/create/`, {
        project_title: project_title,
        project_description: project_description,
        project_youtube_url: project_youtube_url,
      });
      console.log("Response from  create project", response);
      const data = response.data;

      if (response.status === 201) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
