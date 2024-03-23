import { createAsyncThunk } from "@reduxjs/toolkit";

import { getNewTokens, sign } from "@/components/shared/handler";
import { removeTokenStorage } from "@/components/shared/api/lib/interceptor/AuthHelper";
import { ILogin } from "@/app/(auth)/login/Login.interface";
import { ISignup } from "@/app/(auth)/signup/Signup.interface";

import { AuthType, IAuthResponse } from "./types";

export const signup = createAsyncThunk<IAuthResponse, ISignup>(
  'auth/register',
  async (data, thunkApi) => {
    try {
      const response = await sign(AuthType.REGISTER, data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
)

export const login = createAsyncThunk<IAuthResponse, ILogin>(
  'auth/login',
  async (data, thunkApi) => {
    try {
      const response = await sign(AuthType.LOGIN, data);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  removeTokenStorage();
});

export const checkAuth = createAsyncThunk<IAuthResponse>(
  'auth/check-auth',
  async (_, thunkApi) => {
    try {
      const response = await getNewTokens();
      return response.data;
    } catch (error) {
      thunkApi.dispatch(logout())
      return thunkApi.rejectWithValue(error);
    }
  }
)