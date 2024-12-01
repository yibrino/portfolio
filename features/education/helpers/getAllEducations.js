import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";

export const getAllEducations = createAsyncThunk(
  "education/getAllEducations",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch education
      const educationsResponse = await axios.get(`${baseUrl}/educations/`);
      const educations = educationsResponse.data;

      // Fetch teams
      const teamsResponse = await axios.get(`${baseUrl}/teams/`);
      const teams = teamsResponse.data;

      // Map team_id to teamprofile_fullname
      const educationsWithTeamName = educations.map((education) => {
        const team = teams.find((t) => t.teamprofile_id === education.team);
        return {
          ...education,
          team: team ? team.teamprofile_fullname : "Unknown",
        };
      });

      return educationsWithTeamName;
    } catch (error) {
      console.error("Error fetching educations or teams:", error);
      return rejectWithValue(
        error.response?.data?.errors?.[0] || "Failed to fetch data."
      );
    }
  }
);
