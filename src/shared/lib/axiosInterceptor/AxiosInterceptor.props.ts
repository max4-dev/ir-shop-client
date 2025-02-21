import { AxiosInstance } from "axios";

import { ITokens } from "../../api/user";

export type AxiosInterceptorProps = {
  axiosInstance: AxiosInstance;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  getIsRefreshSent: () => Promise<boolean>;
  saveTokenStorage: (data: ITokens) => void;
  removeTokenStorage: () => void;
};
