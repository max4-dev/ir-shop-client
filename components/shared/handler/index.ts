import Cookies from "js-cookie";

import { AuthType, IAuthResponse, IUser, Tokens } from "@/redux/auth/types";
import axios from "@/core/axios";
import { ILogin } from "@/components/features/auth/LoginForm/LoginForm.props";

import { saveToStorage } from "../api/lib/interceptor/AuthHelper";

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
