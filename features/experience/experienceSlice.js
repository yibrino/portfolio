import { createSlice } from "@reduxjs/toolkit";
import {
  getAllExperiences,
  createExperience,
  updateExperience,
} from "./helpers";

const experienceSlice = createSlice({
  name: "experience",
  initialState: {
    experiences: [],

    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   Create experience
      .addCase(createExperience.fulfilled, (state, { payload }) => {
        state.experiences = [payload, ...state.experiences]; // Add the new experience to the experiences array
      })
      .addCase(createExperience.rejected, (state, { payload }) => {
        state.error = payload;
      })

      //   getAllExperience
      .addCase(getAllExperiences.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllExperiences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.experiences = action.payload; // Assuming action.payload is the fetched list of project
      })
      .addCase(getAllExperiences.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // Update Experience
      .addCase(updateExperience.fulfilled, (state, { payload }) => {
        state.experiences = state.experiences.map((experience) =>
          experience.workexperience_id === payload.workexperience_id
            ? payload
            : experience
        );
      })
      .addCase(updateExperience.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default experienceSlice.reducer;
