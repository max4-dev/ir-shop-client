export enum SortEnum {
  MaxPrice = "maxPrice",
  MinPrice = "minPrice",
  New = "new",
  Default = "default",
}

export type SortType = {
  name: string;
  type: SortEnum;
};

export interface ISortInitialState {
  sort: SortType;
}
