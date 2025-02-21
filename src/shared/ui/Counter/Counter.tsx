"use client";

/* eslint-disable no-plusplus */

import cn from "classnames";


import { Icon } from "../Icon/Icon";
import { checkRange } from "../../lib";

import { CounterProps } from "./Counter.props";
import styles from "./Counter.module.scss";

const counterSize = {
  min: 1,
  max: 1000,
};

export const Counter = ({
  addToCart,
  removeFromCart,
  value,
  setValue,
  className,
  ...props
}: CounterProps) => {
  const decrement = (value: number) => {
    if (value === counterSize.min) {
      return;
    }
    setValue(--value);
    removeFromCart();
    checkRange({ value, setValue, counterSize, replace: counterSize.min });
  };

  const increment = (value: number) => {
    if (value === counterSize.max) {
      return;
    }
    setValue(++value);
    addToCart();
    checkRange({ value, setValue, counterSize, replace: counterSize.max });
  };

  return (
    <div className={cn(styles.counter, className)} {...props}>
      <button
        className={cn(styles.counterButton, styles.counterMinus)}
        onClick={() => decrement(value)}
      >
        <Icon.MinusIcon />
      </button>
      <span className={styles.counterItem}>{value}</span>
      <button
        className={cn(styles.counterButton, styles.counterPlus)}
        onClick={() => increment(value)}
      >
        <Icon.PlusIcon />
      </button>
    </div>
  );
};
