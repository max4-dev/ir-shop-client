import axios from "axios";

import { ITokens } from "@/redux/auth/types";

export const handleRefreshToken = async (
  oldRefreshToken: string | null
): Promise<[string, string]> => {
  if (!oldRefreshToken) {
    throw new Error("refreshToken does not exist");
  }

  try {
    const {
      data: { accessToken, refreshToken },
    }: { data: ITokens } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login/access-token`,
      {
        refreshToken: oldRefreshToken,
      }
    );

    return [accessToken, refreshToken];
  } catch (error) {
    throw new Error(
      `Произошла ошибка при обновлении accessToken и refreshToken - ${error}, токены не обновлены`
    );
  }
};
