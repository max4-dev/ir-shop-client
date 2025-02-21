import { createAsyncThunk } from "@reduxjs/toolkit";

import { profileRequest } from "@/src/entities/user/handler";
import { UserDTO } from "@/src/shared/types";

export const getProfile = createAsyncThunk<UserDTO>("users/profile", async (_, thunkApi) => {
  try {
    const response = await profileRequest();

    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
