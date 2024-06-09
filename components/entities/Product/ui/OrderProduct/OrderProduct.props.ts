import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface OrderProductProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string;
  price: number;
  title: string;
  count: number;
  imageUrl: string;
}
