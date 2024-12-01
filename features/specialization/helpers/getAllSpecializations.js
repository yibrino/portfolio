import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utlis/config";

export const getAllSpecializations = createAsyncThunk(
  "specialization/getAllSpecializations",
  async (_, { rejectWithValue }) => {
    try {
      // Fetch specializations
      const specializationResponse = await axios.get(
        `${baseUrl}/specializations/`
      );
      const specializations = specializationResponse.data;

      // Fetch teams
      const teamsResponse = await axios.get(`${baseUrl}/teams/`);
      const teams = teamsResponse.data;

      // Map team_id to teamprofile_fullname
      const specializationsWithTeamName = specializations.map(
        (specialization) => {
          const team = teams.find(
            (t) => t.teamprofile_id === specialization.team
          );
          return {
            ...specialization,
            team: team ? team.teamprofile_fullname : "Unknown",
          };
        }
      );

      return specializationsWithTeamName;
    } catch (error) {
      console.error("Error fetching specializations or teams:", error);
      return rejectWithValue(
        error.response?.data?.errors?.[0] || "Failed to fetch data."
      );
    }
  }
);
