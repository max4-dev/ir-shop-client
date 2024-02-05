import { ReactNode } from "react";

export interface PopupProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}