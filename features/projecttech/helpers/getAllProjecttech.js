import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";

export const getAllProjecttechs = createAsyncThunk(
  "projecttechs/getAllProjecttechs",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch projecttechs
      const projecttechsResponse = await axios.get(`${baseUrl}/projecttechs/`);
      const projecttechs = projecttechsResponse.data;

      // Fetch projects
      const projectsResponse = await axios.get(`${baseUrl}/projects/`);
      const projects = projectsResponse.data;

      // Map project_id to project_title
      const projecttechssWithProjectTitle = projecttechs.map((projecttech) => {
        const project = projects.find(
          (item) => item.project_id === projecttech.project
        );
        return {
          ...projecttech,
          project: project ? project.project_title : "Unknown",
        };
      });

      return projecttechssWithProjectTitle;
    } catch (error) {
      console.error("Error fetching projecttechs or projects:", error);
      return rejectWithValue(
        error.response?.data?.errors?.[0] || "Failed to fetch data."
      );
    }
  }
);
