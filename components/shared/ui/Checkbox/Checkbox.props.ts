import { DetailedHTMLProps, Dispatch, LabelHTMLAttributes, ReactNode, SetStateAction } from "react";

export interface CheckboxProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  setChecked?: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}