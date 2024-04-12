import { IProduct } from "@/components/entities/Product/ui/Product.props";

export interface ICartInitialState {
  products: (IProduct & { count: number })[];
  totalCount: number;
  totalPrice: number;
}