import { createAsyncThunk } from "@reduxjs/toolkit";

import { profileRequest } from "@/components/shared/handler";

import { IUser } from "../auth/types";

export const getProfile = createAsyncThunk<IUser>("users/profile", async (_, thunkApi) => {
  try {
    const response = await profileRequest();

    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
