import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface AddToCartButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  itemId: string;
}
