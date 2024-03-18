import { AxiosInstance } from "axios";

import { ITokens } from "@/redux/auth/types";

export type AxiosInterceptorProps = {
  axiosInstance: AxiosInstance,
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  getIsRefreshSent: () => Promise<boolean>;
  saveTokenStorage: (data: ITokens) => void;
  // setIsRefreshSent: (value: boolean) => void;
  removeTokenStorage: () => void;
};