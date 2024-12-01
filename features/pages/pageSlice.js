import { createSlice } from "@reduxjs/toolkit";
import { getAllPages } from "./helpers";
import { createPage } from "./helpers/createPage";
import { updatePage } from "./helpers";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    pages: [],
    selectedPage: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    setSelectedPage: (state, action) => {
      state.selectedPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //   Create page
      .addCase(createPage.fulfilled, (state, { payload }) => {
        state.pages = [payload, ...state.pages]; // Add the new page to the pages array
      })
      .addCase(createPage.rejected, (state, { payload }) => {
        state.error = payload;
      })
      //   getAllPages
      .addCase(getAllPages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllPages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pages = action.payload;
      })
      .addCase(getAllPages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Page
      .addCase(updatePage.fulfilled, (state, { payload }) => {
        state.pages = state.pages.map((page) =>
          page.page_id === payload.page_id ? payload : page
        );
      })
      .addCase(updatePage.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});
// export the selector function
export const selectedPage = (state) => state.pages.selectedPage;
export const { setSelectedPage } = pageSlice.actions;
export default pageSlice.reducer;
