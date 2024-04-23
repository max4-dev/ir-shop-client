import axios from "axios";

import { axiosInterceptor } from "@/components/shared/api";
import { API_URL } from "@/components/shared/api/const/ApiUrl";
import {
  getAccessToken,
  getIsRefreshSent,
  getRefreshToken,
  removeTokenStorage,
  saveTokenStorage,
} from "@/components/shared/api/lib/interceptor/AuthHelper";

const axiosInstance = axios.create({
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

export default axiosInstance;
