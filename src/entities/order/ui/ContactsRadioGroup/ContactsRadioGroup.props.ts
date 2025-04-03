import { ControllerRenderProps } from "react-hook-form";

import { ContactFormData } from "@/src/features/order/types/contacts";

export interface ContactsRadioGroupProps {
  className?: string;
  field: ControllerRenderProps<ContactFormData, "contact.type">;
  handleChangeContactType: (e: string, onChange: (...event: unknown[]) => void) => void;
}