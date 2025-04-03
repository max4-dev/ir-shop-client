import { cache } from "react";

import { axiosInstance, notify } from "@/src/shared/lib";

import { guestUserApi } from "../api";
import { IGuestUserRequest } from "../types";

const register = cache(async (data: IGuestUserRequest) => {
  try {
    const res = await axiosInstance.post<string>(guestUserApi.register, data);
    return res.data;
  } catch (error) {
    console.log(error);
    notify({ message: "Ошибка при регистрации", type: "error" });
    return null;
  }
});

export const guestUserRequest = { register };
