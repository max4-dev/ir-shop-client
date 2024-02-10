import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ProfileMenuItem {
  title: string;
  href?: string;
  onClick?: () => void;
}

export type ProfileMenuProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  items: ProfileMenuItem[]
}