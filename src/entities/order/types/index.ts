import { IMinProduct } from "../../product/types";

export type StatusValues = "complete" | "delivering" | "pending" | "cancel";

export interface IOrder {
  id: string;
  status: StatusValues;
  name: string;
  price: number;
  count: number;
  address: string;
  city: string;
  postIndex: string;
  products: IMinProduct[];
  userId: string | null;
}

export type IOrderRequest = Omit<IOrder, "id" | "status">;
export type IGuestOrderRequest = Omit<IOrder, "id" | "status" | "userId"> & { token: string };
