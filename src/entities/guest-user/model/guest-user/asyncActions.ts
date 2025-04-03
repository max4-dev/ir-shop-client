import { createAsyncThunk } from "@reduxjs/toolkit";

import { notify } from "@/src/shared/lib";

import { guestUserRequest } from "../../handler";
import { IGuestUserRequest } from "../../types";

export const register = createAsyncThunk<string | null, IGuestUserRequest>(
  "guestUser/register",
  async (data, thunkApi) => {
    try {
      const token = await guestUserRequest.register(data);
      return token;
    } catch (error) {
      notify({ message: "Ошибка при регистрации заказа, попробуйте позже", type: "error" });
      return thunkApi.rejectWithValue(error);
    }
  }
);
