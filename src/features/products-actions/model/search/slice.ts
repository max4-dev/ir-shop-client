import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ISearchInitialState } from "./types";

const initialState: ISearchInitialState = {
  search: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export const search = searchSlice.reducer;
