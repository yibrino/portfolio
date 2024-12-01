import { createSlice } from "@reduxjs/toolkit";
import { getAllProjects, createProject, updateProject } from "./helpers";

const ProjectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],

    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   Create project
      .addCase(createProject.fulfilled, (state, { payload }) => {
        state.projects = [payload, ...state.projects]; // Add the new project to the projects array
      })
      .addCase(createProject.rejected, (state, { payload }) => {
        state.error = payload;
      })

      //   getAllProjects
      .addCase(getAllProjects.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllProjects.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.projects = payload; // Assuming action.payload is the fetched list of project
      })
      .addCase(getAllProjects.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // Update Project
      .addCase(updateProject.fulfilled, (state, { payload }) => {
        state.projects = state.projects.map((project) =>
          project.project_id === payload.project_id ? payload : project
        );
      })
      .addCase(updateProject.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default ProjectSlice.reducer;
