import { LinkProps } from "next/link";
import { PropsWithChildren, ReactNode } from "react";

export interface StyledLinkProps extends PropsWithChildren<LinkProps>{
  children: ReactNode;
  className?: string;
  size?: 'fullWidth' | 'small' | 'medium' | 'big';
  appearance?: 'primary' | 'ghost';
  icon?: any | 'none';
}