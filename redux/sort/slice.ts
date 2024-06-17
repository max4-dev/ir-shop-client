import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ISortInitialState, SortEnum, SortType } from "./types";

const initialState: ISortInitialState = {
  sort: {
    name: "Новизне",
    type: SortEnum.Default,
  },
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
  },
});

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;
