"use client";

import cn from "classnames";
import { forwardRef } from "react";
import PhoneNumberInput, { Value } from "react-phone-number-input/input";

import { irShopBrand } from "../../const";

import styles from "./PhoneInput.module.scss";
import { PhoneInputProps } from "./PhoneInput.props";

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      errorMessage,
      label = "Телефон",
      placeholder = irShopBrand.parsedPhone,
      className,
      onChange,
      ...props
    }: PhoneInputProps,
    ref
  ) => {
    const handleChange = (value: Value) => {
      if (onChange) {
        onChange(value as string);
      }
    };

    return (
      <div className={cn(styles.inputBox, className)}>
        {label && <span className={styles.label}>{label}</span>}
        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
        <div className={styles.prefixBox}>
          <span className={styles.prefix}>+7</span>
          <PhoneNumberInput
            className={cn(styles.input, { [styles.inputError]: errorMessage })}
            country="RU"
            ref={ref}
            placeholder={placeholder}
            onChange={handleChange}
            {...props}
          />
        </div>
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
