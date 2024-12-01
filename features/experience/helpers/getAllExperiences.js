import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";

export const getAllExperiences = createAsyncThunk(
  "experiences/getAllExperiences",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch experiences
      const experiencesResponse = await axios.get(`${baseUrl}/experiences/`);
      const experiences = experiencesResponse.data;

      // Fetch teams
      const teamsResponse = await axios.get(`${baseUrl}/teams/`);
      const teams = teamsResponse.data;

      // Map team_id to teamprofile_fullname
      const experiencesWithTeamName = experiences.map((experience) => {
        const team = teams.find((t) => t.teamprofile_id === experience.team);
        return {
          ...experience,
          team: team ? team.teamprofile_fullname : "Unknown",
        };
      });

      return experiencesWithTeamName;
    } catch (error) {
      console.error("Error fetching experiences or teams:", error);
      return rejectWithValue(
        error.response?.data?.errors?.[0] || "Failed to fetch data."
      );
    }
  }
);
