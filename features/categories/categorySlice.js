import { createSlice } from "@reduxjs/toolkit";
import { createCategory, updateCategory, getAllCategories } from "./helpers";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    selectedCategory: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    // Set the selected Category
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //   Create category
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.categories = [payload, ...state.categories]; // Add the new category to the categories array
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.error = payload;
      })
      // getAllCategories
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(getAllCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = payload; // Ensure payload contains the complete category list
      })
      .addCase(getAllCategories.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      // Update Category
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.categories = state.categories.map((category) =>
          category.category_id === payload.category_id ? payload : category
        );
      })
      .addCase(updateCategory.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});
// export the selector function
export const selectSelectedCategory = (state) =>
  state.categories.selectedCategory;
export const { setSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
