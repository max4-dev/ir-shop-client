import { InternalAxiosRequestConfig } from "axios";

import { notify } from "@/helpers/toastMessage";

import { HttpCodes } from "../../const/ErrorsHttp";

import { handleRefreshToken } from "./HandleRefreshToken";
import { AxiosInterceptorProps } from "./AxiosInterceptor.props";

export const axiosInterceptor = (props: AxiosInterceptorProps) => {
  const {
    axiosInstance,
    getAccessToken,
    getRefreshToken,
    saveTokenStorage,
    removeTokenStorage,
    getIsRefreshSent,
  } = props;
  axiosInstance.defaults.headers["Content-Type"] = "application/json";

  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const accessToken = getAccessToken();

      if (config.headers && accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) =>
      Promise.reject(
        `Произошла ошибка при использовании accessToken - ${error}, accessToken = ${getAccessToken()}`
      )
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === HttpCodes.Unauthorized) {
        const { config } = error;
        const oldRefreshToken = getRefreshToken();

        if (!oldRefreshToken) {
          removeTokenStorage();
          return Promise.reject(error);
        }

        const isSentToRefresh = await getIsRefreshSent();

        if (isSentToRefresh) {
          removeTokenStorage();
          return Promise.reject(error);
        }

        try {
          const [accessToken, refreshToken] = await handleRefreshToken(oldRefreshToken);
          saveTokenStorage({ accessToken, refreshToken });

          config.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(config);
        } catch (error) {
          removeTokenStorage();
          return Promise.reject(error);
        }
      } else {
        notify({ message: error.response.data.message, type: "error" });
        return Promise.reject(error);
      }
    }
  );
};
