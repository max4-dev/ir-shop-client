import Cookies from "js-cookie";
import ky from "ky";

import { ITokens, Tokens } from "@/src/shared/api";

import { CONFIG } from "../config";

export const getAccessToken = () => {
  const accessToken = Cookies.get(Tokens.ACCESS);
  return accessToken || null;
};

export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem(Tokens.REFRESH);
  return refreshToken || null;
};

export const removeTokenStorage = () => {
  Cookies.remove(Tokens.ACCESS);
  localStorage.removeItem(Tokens.REFRESH);
  localStorage.removeItem("user");
};

export const getIsRefreshSent = async () => {
  try {
    const refreshToken = getRefreshToken();

    const response = await ky
      .post<ITokens>(`${CONFIG.API_URL}/auth/login/access-token`, {
        json: { refreshToken },
      })
      .json();
    if (response.accessToken) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error while checking refresh token:", error);
    return true;
  }
};
export const saveTokenStorage = (data: ITokens) => {
  Cookies.set(Tokens.ACCESS, data.accessToken);
  localStorage.setItem(Tokens.REFRESH, data.refreshToken);
};

export const saveToStorage = (data: ITokens) => {
  saveTokenStorage(data);
};

export const handleRefreshToken = async (oldRefreshToken: string | null): Promise<ITokens> => {
  if (!oldRefreshToken) {
    throw new Error("refreshToken does not exist");
  }

  try {
    const { accessToken, refreshToken } = await ky
      .post<ITokens>(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/access-token`, {
        json: { refreshToken: oldRefreshToken },
      })
      .json();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(
      `Произошла ошибка при обновлении accessToken и refreshToken - ${error}, токены не обновлены`
    );
  }
};
