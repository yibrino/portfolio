import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProjecttechs,
  createProjecttech,
  updateProjecttech,
} from "./helpers";

const ProjecttechSlice = createSlice({
  name: "projecttech",
  initialState: {
    projecttechs: [],

    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   Create projecttech
      .addCase(createProjecttech.fulfilled, (state, { payload }) => {
        state.projecttechs = [payload, ...state.projecttechs]; // Add the new projecttech to the projecttechs array
      })
      .addCase(createProjecttech.rejected, (state, { payload }) => {
        state.error = payload;
      })

      //   getAllProjecttechs
      .addCase(getAllProjecttechs.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllProjecttechs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.projecttechs = payload; // Assuming action.payload is the fetched list of projecttech
      })
      .addCase(getAllProjecttechs.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // Update Projecttech
      .addCase(updateProjecttech.fulfilled, (state, { payload }) => {
        state.projecttechs = state.projecttechs.map((projecttech) =>
          projecttech.projecttech_id === payload.projecttech_id
            ? payload
            : projecttech
        );
      })
      .addCase(updateProjecttech.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default ProjecttechSlice.reducer;
