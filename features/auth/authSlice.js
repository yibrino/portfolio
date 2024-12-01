import { createSlice } from "@reduxjs/toolkit";
import { signInHandler } from "./helpers";

const initialState = {
  token: "", // Set default empty values
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOutHandler: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("Admin_User");
      }
      state.token = "";
      state.userData = null;
    },
    initializeAuth: (state) => {
      if (typeof window !== "undefined" && localStorage.getItem("Admin_User")) {
        const adminUser = JSON.parse(localStorage.getItem("Admin_User"));
        state.token = adminUser.token || "";
        state.userData = adminUser || null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInHandler.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInHandler.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.encodedToken;
        state.userData = payload.foundUser;

        if (typeof window !== "undefined") {
          // Store in localStorage
          localStorage.setItem(
            "Admin_User",
            JSON.stringify({
              token: payload.encodedToken,
              userData: payload.foundUser,
            })
          );
        }
      })
      .addCase(signInHandler.rejected, (state, { payload }) => {
        state.isLoading = false;
      });
  },
});

export const { signOutHandler, initializeAuth } = authSlice.actions;

export default authSlice.reducer;
