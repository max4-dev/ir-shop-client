import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IProduct } from "@/components/entities/Product/ui/Product.props";
import { IFilter } from "@/redux/filter/types";

export interface ProductListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  
}

export type FilterType = {
  products: IProduct[] | undefined,
  filter: IFilter,
}