import { API_URL } from "@/components/shared/api/const/ApiUrl";

export const ordersApi = {
  getByUser: `${API_URL}/order/by-user`,
  createOrder: `${API_URL}/order`,
};
