import { cache } from "react";

import { axiosInstance, notify } from "@/src/shared/lib";

import { ordersApi } from "../api";
import { IOrder, IOrderRequest } from "../types";

const getByUser = cache(async () => {
  const res = await axiosInstance.get<IOrder[]>(ordersApi.getByUser);

  return res.data;
});

const createOrder = cache(async (data: Partial<IOrderRequest>) => {
  try {
    const res = await axiosInstance.post<IOrder[]>(ordersApi.createOrder, data);
    return res.data;
  } catch (error) {
    console.log(error);
    notify({ message: "Ошибка при создании заказа", type: "error" });
    return null;
  }
});

export const orderRequest = {
  getByUser,
  createOrder,
};
