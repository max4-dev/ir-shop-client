import { IProduct } from "@/src/entities/product/types";

import { paginate } from "../lib/paginate";
import { defaultLimit } from "../const";

export const useProductsPaginate = ({
  limit,
  activePage,
  products,
}: {
  limit: number;
  activePage: number;
  products: IProduct[] | undefined;
}) => {
  const { sliceItems, pageCount } = paginate({
    activePage,
    limit,
    products: products ?? [],
    defaultLimit,
  });

  return { paginateProducts: sliceItems, pageCount };
};
