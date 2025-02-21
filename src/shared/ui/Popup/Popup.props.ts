import { ReactNode } from "react";

export interface PopupProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  panelClassName?: string;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}
