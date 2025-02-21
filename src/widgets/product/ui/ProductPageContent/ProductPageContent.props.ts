import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IProduct } from "@/src/entities/product/types";

export type ProductPageContentProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  IProduct;
