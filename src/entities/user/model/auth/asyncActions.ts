import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { AuthType, IAuthResponse, ISignup } from "@/src/shared/api/user";
import { removeTokenStorage } from "@/src/shared/lib";

import { getNewTokens, sign } from "../../handler";
import { ILogin } from "../../types";

export const signup = createAsyncThunk<IAuthResponse, ISignup>(
  "auth/register",
  async (data, thunkApi) => {
    try {
      const response = await sign(AuthType.REGISTER, data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error?.response?.data);
      }

      throw error;
    }
  }
);

export const login = createAsyncThunk<IAuthResponse, ILogin>(
  "auth/login",
  async (data, thunkApi) => {
    try {
      const response = await sign(AuthType.LOGIN, data);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error?.response?.data);
      }

      throw error;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  removeTokenStorage();
});

export const checkAuth = createAsyncThunk<IAuthResponse>("auth/check-auth", async (_, thunkApi) => {
  try {
    const response = await getNewTokens();
    return response.data;
  } catch (error) {
    thunkApi.dispatch(logout());
    return thunkApi.rejectWithValue(error);
  }
});
