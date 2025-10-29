import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface RadioProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string;
  label: string;
}