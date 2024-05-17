import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IProduct } from "../Product/Product.props";

export type CartProductProps = IProduct &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    count: number;
  };
