import { IProduct } from "@/src/entities/product/types";

export interface ICartProduct {
  id: string;
  count: number;
}

export type IProductForCart = IProduct & { count: number };

export interface ICartInitialState {
  cartProducts: IProductForCart[];
  products: ICartProduct[];
  totalCount: number;
  totalPrice: number;
  isLoading: boolean;
}
