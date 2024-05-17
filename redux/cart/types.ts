import { IProduct } from "@/components/entities/product/ui/Product/Product.props";

export interface ICartInitialState {
  products: (IProduct & { count: number })[];
  totalCount: number;
  totalPrice: number;
}
