import { createSlice } from "@reduxjs/toolkit";
import { getAllSkills, createSkill, updateSkill } from "./helpers";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    skills: [],

    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   Create skill
      .addCase(createSkill.fulfilled, (state, { payload }) => {
        state.skills = [payload, ...state.skills]; // Add the new skill to the skills array
      })
      .addCase(createSkill.rejected, (state, { payload }) => {
        state.error = payload;
      })

      //   getAllSkills
      .addCase(getAllSkills.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllSkills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.skills = action.payload; // Assuming action.payload is the fetched list of skill
      })
      .addCase(getAllSkills.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // Update Skill
      .addCase(updateSkill.fulfilled, (state, { payload }) => {
        state.skills = state.skills.map((skill) =>
          skill.skill_id === payload.skill_id ? payload : skill
        );
      })
      .addCase(updateSkill.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default skillSlice.reducer;
