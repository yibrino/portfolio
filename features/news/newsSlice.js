import { createSlice } from "@reduxjs/toolkit";
import { createComment, addLike, removeLike, getAllNews } from "./helpers";
import { updateComment } from "./helpers";
const newsSlice = createSlice({
  name: "comment",
  initialState: {
    news: [],
    comments: [],
    likes: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Comment
      .addCase(createComment.fulfilled, (state, { payload }) => {
        state.comments = [payload, ...state.comments]; // Add the new comment to the comments array
      })
      .addCase(createComment.rejected, (state, { payload }) => {
        state.error = payload;
      })
      // Update Comment
      .addCase(updateComment.fulfilled, (state, { payload }) => {
        state.comments = state.comments.map((comment) =>
          comment.comment_id === payload.comment_id ? payload : comment
        );
      })
      .addCase(updateComment.rejected, (state, { payload }) => {
        state.error = payload;
      })
      //   Add Like
      .addCase(addLike.fulfilled, (state, { payload }) => {
        state.likes = [payload, ...state.likes]; // Add the new like to the likes array
      })
      .addCase(addLike.rejected, (state, { payload }) => {
        state.error = payload;
      })
      //   remove Like
      .addCase(removeLike.fulfilled, (state, { payload }) => {
        state.likes = state.likes.filter(
          (like) => like.liked_by != payload.liked_by
        ); // remove the new like
      })
      .addCase(removeLike.rejected, (state, { payload }) => {
        state.error = payload;
      })
      //   getAllNews
      .addCase(getAllNews.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload; // Assuming action.payload is the fetched list of news
      })
      .addCase(getAllNews.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
