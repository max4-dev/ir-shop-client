import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IIsOpened {
  type: boolean;
  price: boolean;
}

export interface FilterProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  
}