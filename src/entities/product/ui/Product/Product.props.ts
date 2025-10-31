import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

import { IProduct } from "../../model";

export interface ProductProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  favoriteButtonSlot: ReactNode;
  cartButtonSlot: ReactNode;
  product: IProduct;
}
