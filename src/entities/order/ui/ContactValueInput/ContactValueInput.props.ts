import { DetailedHTMLProps, InputHTMLAttributes } from "react";

import { ContactType } from "@/src/shared/types";

export interface ContactValueInputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  contactType?: ContactType;
  errorMessage?: string;
  value?: string;
  label?: string;
  placeholder?: string;
}