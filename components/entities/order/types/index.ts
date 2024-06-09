import { DaDataAddress, DaDataSuggestion } from "react-dadata";

import { IUser } from "@/redux/auth/types";

import { IMinProduct } from "../../product/types";

export type StatusValues = "complete" | "delivering" | "pending" | "cancel";

export interface IOrder {
  id: string;
  status: StatusValues;
  address: DaDataSuggestion<DaDataAddress>;
  price: number;
  count: number;
  products: IMinProduct[];
  user: IUser;
}

export type IOrderRequest = Omit<IOrder, "id">;
