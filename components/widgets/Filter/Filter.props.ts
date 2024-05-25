import { DetailedHTMLProps, HTMLAttributes } from "react";
import ReactSlider from "react-slider";

export interface IIsOpened {
  price: boolean;
}

export interface SliderStateWithValue extends ReactSlider<number[]> {
  state: { value: number[] };
}

export interface FilterProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  setFilterOpen?: (isOpen: boolean) => void;
}
