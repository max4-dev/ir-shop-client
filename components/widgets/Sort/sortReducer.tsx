import { IProduct } from "@/components/entities/Product/ui/Product.props";
import { SortEnum } from "@/redux/filter/types";

export type SortActions = { type: SortEnum.Price } | { type: SortEnum.Default } | { type: SortEnum.Rating } | { type: 'reset', initialState: IProduct[] }

export interface SortReducerState {
  sort: SortEnum;
  products: IProduct[] | undefined;
}

export const sortReducer = (state: SortReducerState, action: SortActions) => {
  switch (action.type) {
    case SortEnum.Rating:
      return {
        sort: SortEnum.Rating,
        products: state.products && [...state.products.sort((a, b) => (a.rating > b.rating) ? -1 : 1)]
      }

    case SortEnum.Price:
      return {
        sort: SortEnum.Price,
        products: state.products && [...state.products.sort((a, b) => (a.priceWithSale < b.priceWithSale) ? 1 : -1)]
      }

    case SortEnum.Default:
      return {
        sort: SortEnum.Default,
        products: state.products
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