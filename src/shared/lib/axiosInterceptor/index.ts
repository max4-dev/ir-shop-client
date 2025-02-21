import axios from "axios";

import { API_URL } from "../../const/api";

import { axiosInterceptor } from "./AxiosInterceptor";
import { getAccessToken, getIsRefreshSent, getRefreshToken, removeTokenStorage, saveTokenStorage } from "./AuthHelper";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInterceptor({
  axiosInstance,
  getAccessToken,
  getRefreshToken,
  saveTokenStorage,
  removeTokenStorage,
  getIsRefreshSent,
});
