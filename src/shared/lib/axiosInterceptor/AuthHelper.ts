import axios from "axios";
import Cookies from "js-cookie";

import { IAuthResponse, ITokens, Tokens } from "../../api/user";

export const getAccessToken = () => {
  const accessToken = Cookies.get(Tokens.ACCESS);
  return accessToken || null;
};

export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem(Tokens.REFRESH);
  return refreshToken || null;
};

export const getUserFromStorage = async () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

export const removeTokenStorage = () => {
  Cookies.remove(Tokens.ACCESS);
  localStorage.removeItem(Tokens.REFRESH);
  localStorage.removeItem("user");
};

export const getIsRefreshSent = async () => {
  try {
    const refreshToken = getRefreshToken();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login/access-token`,
      { refreshToken }
    );
    if (response.data.accessToken) {
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

export const saveToStorage = (data: IAuthResponse) => {
  saveTokenStorage(data);

  localStorage.setItem("user", JSON.stringify(data.user));
};
