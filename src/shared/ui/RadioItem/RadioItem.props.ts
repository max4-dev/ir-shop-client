import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface RadioItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string;
  label: string;
}