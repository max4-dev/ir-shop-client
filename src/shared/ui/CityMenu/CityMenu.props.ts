import { DetailedHTMLProps, ElementType, HTMLAttributes } from "react";

export type CityMenuProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  customInput: ElementType;
};
