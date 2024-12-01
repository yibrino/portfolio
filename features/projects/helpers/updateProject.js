import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";
export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (
    { project_id, project_title, project_description, project_youtube_url },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${baseUrl}/project/update/${project_id}/`,
        {
          project_title: project_title,
          project_description: project_description,
          project_youtube_url: project_youtube_url,
        }
      );
      console.log("Response from  update project", response);
      const data = response.data;

      if (response.status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.errors[0]);
    }
  }
);
