export interface ILimitQuery {
  limit: number;
  page: number;
}

export interface IMinProduct {
  id: string;
  count: number;
}

type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export interface IProduct {
  id: string;
  title: string;
  salePercent: Range<0, 101>;
  slug: string;
  description?: string;
  images: string[];
  categories?: string[];
  price: number;
  inStock?: boolean;
  rating: number;
  priceWithSale: number;
  createdAt: string;
  updatedAt: string;
}

export interface ILimitProductsResponse {
  products: IProduct[];
  page: number;
  pages: number;
}