import { IContact } from "@/src/shared/types";

export interface ContactFormData {
  name: string;
  postIndex: string;
  city: string;
  address: string;
  contact: IContact;
}
