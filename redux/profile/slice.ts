import { createSlice } from "@reduxjs/toolkit";

import { IUserInitialState } from "./types";
import { getProfile } from "./asyncActions";

const initialState: IUserInitialState = {
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

export default userSlice.reducer;
