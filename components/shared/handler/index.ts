import Cookies from "js-cookie";

import { IAuthResponse, Tokens } from "@/redux/auth/types";
import { ILogin } from "@/app/(auth)/login/Login.interface";
import axios from "@/core/axios";

import { saveToStorage } from "../api/lib/interceptor/AuthHelper";

export const getNewTokens = async () => {
  const refreshToken = Cookies.get(Tokens.REFRESH);

  const response = await axios.post<string, { data: IAuthResponse }>(
    '/auth/login/access-token',
    { refreshToken }
  )

  if (response.data.accessToken) {
    saveToStorage(response.data);
  }

  return response;
}

export const sign = async (type: 'login' | 'register', data: ILogin) => {
  const response = await axios<IAuthResponse>({
      url: `/auth/${type}`,
      method: 'POST',
      data
    }
  )

  if (response.data.accessToken) {
    saveToStorage(response.data)
  }

  return response;
}