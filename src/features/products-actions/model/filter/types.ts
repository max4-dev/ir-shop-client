import { IFilter } from "@/src/shared/types";

export interface IFilterInitialState {
  filter: IFilter;
  activePage: number;
  catalogCountPages: number;
}
