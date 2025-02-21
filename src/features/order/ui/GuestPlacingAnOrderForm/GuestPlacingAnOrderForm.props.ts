import { DetailedHTMLProps, FormHTMLAttributes } from "react";

import { ContactType } from "@/src/shared/types";

export type GuestPlacingAnOrderFormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export interface ContactFormData {
  name: string;
  postIndex: string;
  city: string;
  address: string;
  contact: {
    value: string;
    type: ContactType;
  };
}