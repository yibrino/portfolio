import { createSlice } from "@reduxjs/toolkit";
import { getAllEducations, createEducation, updateEducation } from "./helpers";

const educationSlice = createSlice({
  name: "education",
  initialState: {
    educations: [],

    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   Create education
      .addCase(createEducation.fulfilled, (state, { payload }) => {
        state.educations = [payload, ...state.educations]; // Add the new education to the education array
      })
      .addCase(createEducation.rejected, (state, { payload }) => {
        state.error = payload;
      })

      //   getAllEducation
      .addCase(getAllEducations.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllEducations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.educations = action.payload; // Assuming action.payload is the fetched list of education
      })
      .addCase(getAllEducations.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // Update Education
      .addCase(updateEducation.fulfilled, (state, { payload }) => {
        state.educations = state.educations.map((education) =>
          education.educationbackground_id === payload.educationbackground_id
            ? payload
            : education
        );
      })
      .addCase(updateEducation.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default educationSlice.reducer;
