export interface PhoneInputProps {
  className?: string;
  errorMessage?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}
