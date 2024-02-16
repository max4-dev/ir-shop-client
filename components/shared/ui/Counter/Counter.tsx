"use client"

/* eslint-disable no-plusplus */

import cn from "classnames";
import Image from "next/image";

import { checkRange } from "@/helpers/checkRange";

import { CounterProps } from "./Counter.props";
import styles from "./Counter.module.scss";

const counterSize = {
  min: 1,
  max: 1000,
}

export const Counter = ({ value, setValue, className, ...props }: CounterProps) => {
  const onChangeCount = (value: number) => {
    setValue(String(value))
    checkRange({ value, setValue, counterSize, replace: "0"})
  }

  const decrement = (value: number) => {
    setValue(String(--value))
    checkRange({ value, setValue, counterSize, replace: counterSize.min})
  }

  const increment = (value: number) => {
    setValue(String(++value))
    checkRange({ value, setValue, counterSize, replace: counterSize.max })
  }

  return (
    <div className={cn(styles.counter, className)} {...props}>
      <button className={cn(styles.counterButton, styles.counterMinus)} onClick={() => decrement(Number(value))}>
        <Image src="/images/icons/minus.svg" width={20} height={20} alt="Минус" />
      </button>
      <input className={styles.counterInput} onChange={({target}) => onChangeCount(Number(target.value))} value={value} type="number" min={counterSize.min} max={counterSize.max} />
      <button className={cn(styles.counterButton, styles.counterPlus)} onClick={() => increment(Number(value))}>
        <Image src="/images/icons/plus.svg" width={20} height={20} alt="Плюс" />
      </button>
    </div>
  );
}