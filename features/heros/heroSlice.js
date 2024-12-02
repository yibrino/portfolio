import { createSlice } from "@reduxjs/toolkit";
import { getAllHeros, createHero, updateHero } from "./helpers";

const heroSlice = createSlice({
  name: "hero",
  initialState: {
    heros: [],

    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   Create hero
      .addCase(createHero.fulfilled, (state, { payload }) => {
        state.heros = [payload, ...state.heros]; // Add the new comment to the comments array
      })
      .addCase(createHero.rejected, (state, { payload }) => {
        state.error = payload;
      })

      //   getAllHeros
      .addCase(getAllHeros.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllHeros.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.heros = payload; // Assuming action.payload is the fetched list of news
      })
      .addCase(getAllHeros.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })

      // Update Hero
      .addCase(updateHero.fulfilled, (state, { payload }) => {
        state.heros = state.heros.map((hero) =>
          hero.hero_id === payload.hero_id ? payload : hero
        );
      })
      .addCase(updateHero.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export default heroSlice.reducer;
