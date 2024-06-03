import { IProduct } from "@/components/entities/product/ui/Product/Product.props";

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
