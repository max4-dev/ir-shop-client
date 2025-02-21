import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IProduct } from "@/src/entities/product/types";
import { SortEnum } from "@/src/features/products-actions/model/sort/types";
import { IFilter } from "@/src/shared/types";

export type ProductListProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type FilterType = {
  products: IProduct[] | undefined;
  filter: IFilter;
};

export interface ISort {
  products: IProduct[] | undefined;
  type: SortEnum;
}
