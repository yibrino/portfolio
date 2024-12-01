import { createSlice } from "@reduxjs/toolkit";
import { getAllTeams, createTeam, updateTeam } from "./helpers";
const teamSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   Create Team
      .addCase(createTeam.fulfilled, (state, { payload }) => {
        state.teams = [payload, ...state.teams]; // Add the new carousel to the carousels array
      })
      .addCase(createTeam.rejected, (state, { payload }) => {
        state.error = payload;
      })
      //   getAllTeams
      .addCase(getAllTeams.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllTeams.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.teams = payload; // Assuming action.payload is the fetched list of news
      })
      .addCase(getAllTeams.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // Update Team
      .addCase(updateTeam.fulfilled, (state, { payload }) => {
        state.teams = state.teams.map((team) =>
          team.teamprofile_id === payload.teamprofile_id ? payload : team
        );
      })
      .addCase(updateTeam.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default teamSlice.reducer;
