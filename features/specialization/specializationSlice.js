import { createSlice } from "@reduxjs/toolkit";
import {
  getAllSpecializations,
  createSpecialization,
  updateSpecialization,
} from "./helpers";

const specializationSlice = createSlice({
  name: "specialization",
  initialState: {
    specializations: [],

    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   Create specialization
      .addCase(createSpecialization.fulfilled, (state, { payload }) => {
        state.specializations = [payload, ...state.specializations]; // Add the new specialization to the specializations array
      })
      .addCase(createSpecialization.rejected, (state, { payload }) => {
        state.error = payload;
      })

      //   getAllSpecializations
      .addCase(getAllSpecializations.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllSpecializations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.specializations = action.payload; // Assuming action.payload is the fetched list of specialization
      })
      .addCase(getAllSpecializations.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // Update Specializations
      .addCase(updateSpecialization.fulfilled, (state, { payload }) => {
        state.specializations = state.specializations.map((specialization) =>
          specialization.careerspecialization_id ===
          payload.careerspecialization_id
            ? payload
            : specialization
        );
      })
      .addCase(updateSpecialization.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default specializationSlice.reducer;
