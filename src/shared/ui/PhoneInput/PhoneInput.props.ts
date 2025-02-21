import { Value } from "react-phone-number-input";

export interface PhoneInputProps {
  className?: string;
  errorMessage?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  onChange?: (value?: Value | undefined) => void;
}