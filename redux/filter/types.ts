export interface IFilter {
  price: number[];
  categories: string[];
}

export interface IFilterInitialState {
  filter: IFilter;
  activePage: number;
  catalogCountPages: number;
}
