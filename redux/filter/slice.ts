import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { defaultPrice } from "@/helpers/const/defaultPrice";

import { IFilter, IFilterInitialState, SortEnum, SortType } from "./types";

const initialState: IFilterInitialState = {
  sort: {
    name: 'Новизне',
    type: SortEnum.Default,
  },
  filter: {
    categories: [],
    price: defaultPrice,
  },
  activePage: 1,
  catalogCountPages: 0,
  search: '',
  isLoading: false,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setFilter(state, action: PayloadAction<IFilter>) {
      state.filter = { ...state.filter, ...action.payload };
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setActivePage(state, action: PayloadAction<number>) {
      state.activePage = action.payload;
    },
    setCatalogCountPages(state, action: PayloadAction<number>) {
      state.catalogCountPages = action.payload;
    },
  },
})

export const { setSort, setFilter, setSearch, setActivePage, setCatalogCountPages } = filterSlice.actions;
export default filterSlice.reducer;