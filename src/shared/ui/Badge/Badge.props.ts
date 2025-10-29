import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface BadgeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
  appearance: "ghost" | "success" | "danger";
}
