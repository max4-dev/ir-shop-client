import { IContact } from "@/src/shared/types";

import { IOrder } from "../../order/types";

export interface IGuestUser {
  id: string;
  token: string;
  name: string;
  address: string;
  city: string;
  postIndex: string;
  contact: IContact;
  orders: IOrder[];
}

export type IGuestUserRequest = Omit<IGuestUser, "id" | "orders" | "token">;
