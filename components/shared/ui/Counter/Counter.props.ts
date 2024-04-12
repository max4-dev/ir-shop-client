import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export interface counterSizeI {
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
