import { DetailedHTMLProps, HTMLAttributes } from "react";

import { StatusValues } from "@/components/entities/order/types";

export interface StatusProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  status?: StatusValues;
}
