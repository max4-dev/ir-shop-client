import { createSlice } from "@reduxjs/toolkit";

import { getStoreLocal } from "@/helpers/getStoreLocal";

import { IAuthInitialState } from "./types";
import { checkAuth, login, logout, signup } from "./asyncActions";

const initialState: IAuthInitialState = {
  user: getStoreLocal("user"),
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });

    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
    });

    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
