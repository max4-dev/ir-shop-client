import { DetailedHTMLProps, LabelHTMLAttributes } from "react";

export interface CheckboxProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  text: string;
}