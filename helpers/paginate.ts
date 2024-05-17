import { IProduct } from "@/components/entities/product/ui/Product/Product.props";

interface IPaginate {
  activePage: number;
  limit: number;
  products: IProduct[];
  defaultLimit: number;
}

export const paginate = ({ activePage, limit, products, defaultLimit }: IPaginate) => {
  const startIndex = (activePage - 1) * limit;
  const pageCount = Math.ceil(products.length / defaultLimit);
  const sliceItems = products.slice(startIndex, limit * activePage);

  return { sliceItems, pageCount };
};
