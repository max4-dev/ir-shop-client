import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

type RenderChildren = (open: boolean) => ReactNode;

export type DropdownProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  buttonChildren: ReactNode | RenderChildren;
  buttonClassName?: string;
  children: ReactNode;
  panelClassName?: string;
  overlay?: boolean;
  className?: string;
  float?: boolean;
};
