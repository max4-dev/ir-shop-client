"use client";

import cn from "classnames";
import { MouseEvent, useState } from "react";

import { Icon } from "../../assets";

import styles from "./Input.module.scss";
import { InputProps } from "./Input.props";

export const Input = ({
  errorMessage,
  placeholder,
  type,
  label,
  isPassword = false,
  className,
  ref,
  ...props
}: InputProps) => {
  const [inputType, setInputType] = useState(type);

  const toggleVisible = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <div className={cn(styles.inputBox, className)}>
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      <input
        className={cn(styles.input, { [styles.inputError]: errorMessage })}
        ref={ref}
        placeholder={placeholder}
        type={inputType}
        {...props}
      />
      {isPassword && (
        <button onClick={toggleVisible} className={styles.inputButton}>
          {inputType === "password" ? <Icon.EyeIcon /> : <Icon.EyeSlashIcon />}
        </button>
      )}
    </div>
  );
};
