import { createSlice } from "@reduxjs/toolkit";

import { UserDTOInitialState } from "./types";
import { getProfile } from "./asyncActions";

const initialState: UserDTOInitialState = {
  profile: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoading = false;
      })
      .addCase(getProfile.rejected, (state) => {
        state.profile = null;
        state.isLoading = false;
      });
  },
});

export const profile = userSlice.reducer;
