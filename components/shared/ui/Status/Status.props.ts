import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface StatusProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  status?: "complete" | "pending" | "cancel";
}