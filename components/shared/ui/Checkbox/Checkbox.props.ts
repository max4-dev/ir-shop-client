import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  children: ReactNode;
}