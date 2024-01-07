import { DetailedHTMLProps, LabelHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  children: ReactNode;
}