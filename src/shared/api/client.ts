import ky from "ky";

import {
  getAccessToken,
  getIsRefreshSent,
  getRefreshToken,
  handleRefreshToken,
  removeTokenStorage,
  saveTokenStorage,
} from "./authHelper";
import { HttpCodes } from "./const/httpCodes";

export const client = ky.create({
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = getAccessToken();
        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === HttpCodes.Unauthorized) {
          const oldRefreshToken = getRefreshToken();
          if (!oldRefreshToken) {
            removeTokenStorage();
            throw new Error("No refresh token");
          }

          const isSentToRefresh = await getIsRefreshSent();
          if (isSentToRefresh) {
            removeTokenStorage();
            throw new Error("Already tried to refresh token");
          }

          try {
            const { accessToken, refreshToken } = await handleRefreshToken(oldRefreshToken);
            saveTokenStorage({ accessToken, refreshToken });

            const retryRequest = new Request(request, {
              headers: new Headers(request.headers),
            });
            retryRequest.headers.set("Authorization", `Bearer ${accessToken}`);
            return ky(retryRequest, options);
          } catch (err) {
            removeTokenStorage();
            throw err;
          }
        }

        if (response.status === HttpCodes.UserNotFound) {
          removeTokenStorage();
          throw new Error("User not found");
        }

        if (!response.ok) {
          try {
            const data = await response.json();
            console.log(data);
          } catch {
            console.log({ message: "Unknown error", type: "error" });
          }
          throw new Error(response.statusText);
        }

        return response;
      },
    ],
  },
});
