"use client";

import cn from "classnames";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

import { PopupProps } from "./Popup.props";
import styles from "./Popup.module.scss"

export const Popup = ({ isOpen, setIsOpen, children, className, ...props }: PopupProps) => {
  return (
    <div className={cn(styles.popup, className)} {...props}>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={styles.popupDialog} onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter={styles.enter}
            enterFrom={styles.enterFrom}
            enterTo={styles.enterTo}
            leave={styles.leave}
            leaveFrom={styles.leaveFrom}
            leaveTo={styles.leaveTo}
          >
            <div className={styles.popupBackground} />
          </Transition.Child>

          <div className={styles.popupBox}>
            <Transition.Child
              as={Fragment}
              enter={styles.enter}
              enterFrom={styles.enterFrom}
              enterTo={styles.enterTo}
              leave={styles.leave}
              leaveFrom={styles.leaveFrom}
              leaveTo={styles.leaveTo}
            >
              <Dialog.Panel className={styles.popupPanel}>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}