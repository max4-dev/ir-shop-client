import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface PlacingAnOrderPopupProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}
