import { IProduct } from "@/src/entities/product/types";

import { SortEnum } from "../../model/sort/types";

export type SortActions =
  | { type: SortEnum.MaxPrice; products: IProduct[] | undefined }
  | { type: SortEnum.MinPrice; products: IProduct[] | undefined }
  | { type: SortEnum.New; products: IProduct[] | undefined }
  | { type: SortEnum.Default; products: IProduct[] | undefined }
  | { type: "reset"; initialState: IProduct[] | undefined };

export interface SortReducerState {
  sort: SortEnum;
  products: IProduct[] | undefined;
}

export const sortReducer = (state: SortReducerState, action: SortActions) => {
  switch (action.type) {
    case SortEnum.MaxPrice:
      return {
        sort: SortEnum.MaxPrice,
        products: action.products && [
          ...action.products.sort((a, b) => (a.priceWithSale < b.priceWithSale ? 1 : -1)),
        ],
      };

    case SortEnum.MinPrice:
      return {
        sort: SortEnum.MaxPrice,
        products: action.products && [
          ...action.products.sort((a, b) => (a.priceWithSale > b.priceWithSale ? 1 : -1)),
        ],
      };

    case SortEnum.New:
      return {
        sort: SortEnum.Default,
        products: action.products && [
          ...action.products.sort((a, b) => {
            return Date.parse(a.updatedAt) < Date.parse(b.updatedAt) ? 1 : -1;
          }),
        ],
      };

    case SortEnum.Default:
      return {
        sort: SortEnum.Default,
        products: action.products,
      };

    case "reset":
      return {
        sort: SortEnum.Default,
        products: action.initialState,
      };

    default:
      throw new Error("Неверный тип сортировки");
  }
};
