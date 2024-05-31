import Cookies from "js-cookie";

import { AuthType, IAuthResponse, IUser, Tokens } from "@/redux/auth/types";
import axios from "@/core/axios";
import { ILogin } from "@/components/features/auth/LoginForm/LoginForm.props";
import { IValidateResponse } from "@/redux/profile/types";
import { notify } from "@/helpers/toastMessage";

import { saveToStorage } from "../api/lib/interceptor/AuthHelper";

import { IUpdateRequest } from "./types";

export const getNewTokens = async () => {
  const refreshToken = Cookies.get(Tokens.REFRESH);

  const response = await axios.post<string, { data: IAuthResponse }>("/auth/login/access-token", {
    refreshToken,
  });

  if (response.data.accessToken) {
    saveToStorage(response.data);
  }

  return response;
};

export const sign = async (type: AuthType.LOGIN | AuthType.REGISTER, data: ILogin) => {
  const response = await axios.post<IAuthResponse>(`/auth/${type}`, data);

  if (response.data.accessToken) {
    saveToStorage(response.data);
  }

  return response;
};

export const profileRequest = async () => {
  const response = await axios.get<IUser>(`/users/profile`);

  return response;
};

export const validatePassword = async (data: ILogin) => {
  try {
    const response = await axios.post<IValidateResponse>(`/auth/validate`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUser = async (data: IUpdateRequest) => {
  try {
    const response = await axios.put<IValidateResponse>(`/users/profile`, data);

    notify({ message: "Данные успешно изменены", type: "success" });

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
