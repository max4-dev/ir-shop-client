import Cookies from "js-cookie";

import { axiosInstance, notify, saveToStorage } from "@/src/shared/lib";
import { AuthType, IAuthResponse, Tokens, UserDTO } from "@/src/shared/api/user";
import { IValidateResponse, UserDTOUpdate } from "@/src/shared/api/profile";

import { ILogin } from "../types";

export const getNewTokens = async () => {
  const refreshToken = Cookies.get(Tokens.REFRESH);

  const response = await axiosInstance.post<string, { data: IAuthResponse }>(
    "/auth/login/access-token",
    {
      refreshToken,
    }
  );

  if (response.data.accessToken) {
    saveToStorage(response.data);
  }

  return response;
};

export const sign = async (type: AuthType.LOGIN | AuthType.REGISTER, data: ILogin) => {
  const response = await axiosInstance.post<IAuthResponse>(`/auth/${type}`, data);

  if (response.data.accessToken) {
    saveToStorage(response.data);
  }

  return response;
};

export const profileRequest = async () => {
  const response = await axiosInstance.get<UserDTO>(`/users/profile`);

  return response;
};

export const validatePassword = async (data: ILogin) => {
  try {
    const response = await axiosInstance.post<IValidateResponse>(`/auth/validate`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUser = async (data: UserDTOUpdate) => {
  try {
    const response = await axiosInstance.put<IValidateResponse>(`/users/profile`, data);

    notify({ message: "Данные успешно изменены", type: "success" });

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
