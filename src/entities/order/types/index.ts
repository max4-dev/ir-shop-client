import { UserDTO } from "@/src/shared/types";

import { IMinProduct } from "../../product/types";

export type StatusValues = "complete" | "delivering" | "pending" | "cancel";

export interface IOrder {
  id: string;
  status: StatusValues;
  price: number;
  count: number;
  products: IMinProduct[];
  user: UserDTO;
}

export type IOrderRequest = Omit<IOrder, "id">;
