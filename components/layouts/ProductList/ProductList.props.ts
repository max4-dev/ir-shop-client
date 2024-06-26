import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IProduct } from "@/components/entities/product/ui/Product/Product.props";
import { IFilter } from "@/redux/filter/types";
import { SortEnum } from "@/redux/sort/types";

export interface ProductListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export type FilterType = {
  products: IProduct[] | undefined;
  filter: IFilter;
};

export interface ISort {
  products: IProduct[] | undefined;
  type: SortEnum;
}
