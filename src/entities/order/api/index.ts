import { API_URL } from "@/src/shared/const";

export const ordersApi = {
  getByUser: `${API_URL}/order/by-user`,
  createOrder: `${API_URL}/order`,
};
