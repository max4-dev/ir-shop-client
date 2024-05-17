import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface ICounterSize {
  min: number;
  max: number;
}

export interface CounterProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  value: number;
  setValue: (value: number) => void;
  addToCart: () => void;
  removeFromCart: () => void;
}
