export enum SortEnum {
  Rating = 'rating',
  Price = 'price',
  Default = 'default'
}

export interface IFilter {
  price: number[],
  categories: string[]
}

export type SortType = {
  name: string;
  type: SortEnum;
}

export interface IFilterInitialState {
  sort: SortType,
  filter: IFilter,
  isLoading: boolean,
}