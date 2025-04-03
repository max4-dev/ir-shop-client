import { createSlice } from "@reduxjs/toolkit";

import { register } from "./asyncActions";
import { IGuestUserInitialState } from "./types";

const initialState: IGuestUserInitialState = {
  token: null,
};

export const guestUserSlice = createSlice({
  name: "guestUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.token = action.payload;
    });
  },
});

export const guestUser = guestUserSlice.reducer;
