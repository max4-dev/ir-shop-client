import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface GuestPlacingAnOrderPopupProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}
