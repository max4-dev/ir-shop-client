import { DetailedHTMLProps, HTMLAttributes } from "react";

import { StatusValues } from "@/src/entities/order/types";


export interface StatusProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  status?: StatusValues;
}
