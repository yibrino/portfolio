import { createSlice } from "@reduxjs/toolkit";
import { createMessage, getAllMessages } from "./helpers";
const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],

    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create message
      .addCase(createMessage.fulfilled, (state, { payload }) => {
        state.messages = [payload, ...state.messages]; // Add the new comment to the messages array
      })
      .addCase(createMessage.rejected, (state, { payload }) => {
        state.error = payload;
      })

      //   getAllMessages
      .addCase(getAllMessages.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllMessages.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.messages = payload; // Assuming action.payload is the fetched list of messages
      })
      .addCase(getAllMessages.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export default messageSlice.reducer;
