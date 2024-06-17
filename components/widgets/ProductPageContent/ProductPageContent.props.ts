import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IProduct } from "../../entities/product/ui/Product/Product.props";

export type ProductPageContentProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  IProduct;
