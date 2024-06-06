import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface CartPopupProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}
