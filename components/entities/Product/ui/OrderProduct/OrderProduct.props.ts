import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface OrderProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  productId: number;
  price: number;
}