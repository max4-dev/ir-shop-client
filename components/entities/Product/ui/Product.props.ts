import { DetailedHTMLProps, HTMLAttributes } from "react";

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export interface IProduct {
  id: string;
  title: string;
  salePercent: Range<0, 101>;
  slug: string;
  description?: string;
  images: string[];
  categories: string[];
  price: number;
  inStock: boolean;
}

export type ProductProps = {
  salePercent?:  Range<0, 101>;
  price: number;
  badges?: string[];
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & IProduct