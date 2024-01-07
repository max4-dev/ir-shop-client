import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ButtonProps extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'onAnimationStart' | 'onDraagStart' | 'onDragEnd' | 'onDrag' | 'ref'> {
  children: ReactNode;
  size?: 'fullWidth' | 'small' | 'medium' | 'big';
  appearance?: 'primary' | 'ghost' | 'disabled';
  icon?: any | 'none';
}