import { IProduct } from "@/components/entities/product/ui/Product/Product.props";
import { defaultLimit } from "@/helpers/const/defaultLimit";
import { paginate } from "@/helpers/paginate";

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
