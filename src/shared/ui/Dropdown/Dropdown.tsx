import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from "@headlessui/react";
import cn from "classnames";
import { Fragment } from "react";

import styles from "./Dropdown.module.scss";
import { DropdownProps } from "./Dropdown.props";

export function Dropdown({
  children,
  panelClassName,
  buttonChildren,
  buttonClassName,
  overlay,
  className,
  float = true,
}: DropdownProps) {
  return (
    <Popover className={cn(styles.dropdown, className)}>
      <PopoverButton className={cn(styles.button, buttonClassName)}>
        {({ open }) => (
          <Fragment>
            {typeof buttonChildren === "function" ? buttonChildren(open) : buttonChildren}
          </Fragment>
        )}
      </PopoverButton>
      {overlay && <PopoverBackdrop className={styles.overlay} />}
      <PopoverPanel className={cn(styles.panel, panelClassName, { [styles.float]: float })}>
        {children}
      </PopoverPanel>
    </Popover>
  );
}
