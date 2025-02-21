import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IProduct } from "../../types";

export type ProductProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  IProduct;
