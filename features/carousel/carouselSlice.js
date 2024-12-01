import { createSlice } from "@reduxjs/toolkit";
import { createCarousel, getAllCarousels, updateCarousel } from "./helpers";
import { toast } from "react-toastify";

const carouselSlice = createSlice({
  name: "carousel",
  initialState: {
    carousels: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Carousel
      .addCase(createCarousel.fulfilled, (state, { payload }) => {
        state.carousels = [payload, ...state.carousels]; // Add the new carousel to the carousels array
      })
      .addCase(createCarousel.rejected, (state, { payload }) => {
        state.error = payload;
      })

      // Get All Carousels
      .addCase(getAllCarousels.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(getAllCarousels.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.carousels = payload; // Ensure payload contains the complete carousel list
      })
      .addCase(getAllCarousels.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // Update Carousel
      .addCase(updateCarousel.fulfilled, (state, { payload }) => {
        state.carousels = state.carousels.map((carousel) =>
          carousel.carousel_id === payload.carousel_id ? payload : carousel
        );
      })
      .addCase(updateCarousel.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default carouselSlice.reducer;
