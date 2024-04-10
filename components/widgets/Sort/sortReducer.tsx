import { IProduct } from "@/components/entities/Product/ui/Product.props";
import { SortEnum } from "@/redux/filter/types";

export type SortActions = 
  { type: SortEnum.Price, products: IProduct[] | undefined } |
  { type: SortEnum.Default, products: IProduct[] | undefined } |
  { type: SortEnum.Rating, products: IProduct[] | undefined } |
  { type: 'reset', initialState: IProduct[] | undefined }

export interface SortReducerState {
  sort: SortEnum;
  products: IProduct[] | undefined;
}

export const sortReducer = (state: SortReducerState, action: SortActions) => {
  switch (action.type) {
    case SortEnum.Rating:
      return {
        sort: SortEnum.Rating,
        products: action.products && [...action.products.sort((a, b) => (a.rating > b.rating) ? -1 : 1)]
      }

    case SortEnum.Price:
      return {
        sort: SortEnum.Price,
        products: action.products && [...action.products.sort((a, b) => (a.priceWithSale < b.priceWithSale) ? 1 : -1)]
      }

    case SortEnum.Default:
      return {
        sort: SortEnum.Default,
        products: action.products && action.products.toReversed()
      }

    case 'reset':
      return {
        sort: SortEnum.Default,
        products: action.initialState
      }

    default:
      throw new Error("Неверный тип сортировки");
  }
}