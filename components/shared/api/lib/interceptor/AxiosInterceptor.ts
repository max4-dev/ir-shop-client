import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

import { notify } from "@/helpers/toastMessage";

import { HttpCodes } from "../../const/ErrorsHttp";

import { handleRefreshToken } from "./HandleRefreshToken";
import { debounceRequests } from "./DebounceRequests";
import { AxiosInterceptorProps } from "./AxiosInterceptor.props";


export const axiosInterceptor = (props: AxiosInterceptorProps) => {
  const {
    axiosInstance,
    getAccessToken,
    getRefreshToken,
    saveTokenStorage,
    removeTokenStorage,
    getIsRefreshSent,
    // setIsRefreshSent,
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

      if (error.response.status === HttpCodes.BadRequest) {
        notify(error.response.data.message, 'error')
      } 
      else if (error.response.status === HttpCodes.Unauthorized) {
        const config: AxiosRequestConfig = error?.config;
        const oldRefreshToken = getRefreshToken();

        if (!oldRefreshToken) {
          return removeTokenStorage();
        }

        const isSentToRefresh = await getIsRefreshSent();

        if (isSentToRefresh) {
          return debounceRequests<AxiosRequestConfig>(
            config,
            getIsRefreshSent,
            getAccessToken,
            200,
            5000
          );
        }
        // setIsRefreshSent(true);

        try {
          const [accessToken, refreshToken] = await handleRefreshToken(oldRefreshToken);
          saveTokenStorage({accessToken, refreshToken})
          if (config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
          return config;
        } catch (error) {
          console.log(error);
          removeTokenStorage();
        } 
        // finally {
        //   setIsRefreshSent(false);
        // }
      }
      throw new Error(error);
    }
  );
};
