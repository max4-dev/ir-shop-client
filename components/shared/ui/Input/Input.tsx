"use client"

import { ChangeEvent, MouseEvent, forwardRef, useEffect, useState } from "react";
import cn from "classnames";

import EyeIcon from "@/public/images/icons/eye.svg"
import EyeISlashcon from "@/public/images/icons/eye-slash.svg"

import { InputProps } from "./Input.props";
import styles from "./Input.module.scss";

export const Input =  forwardRef<HTMLInputElement, InputProps>(({ 
  errorMessage, 
  value, 
  placeholder, 
  type, 
  onChange, 
  isPassword = false,
  className, 
  ...props 
}: InputProps, ref) => {
  const [inputType, setInputType] = useState(type);
  const [customValue, setValue] = useState<string | number | readonly string[] | undefined>();

  useEffect(() => {
    setValue(value);
  }, [value]);

  const change = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

  const toggleVisible = (e:  MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (inputType === "password") {
      setInputType('text')
    } else {
      setInputType('password')
    }
  }

  return (
    <div className={cn(styles.inputBox, className)}>
      {placeholder && 
        <span className={styles.placeholder}>
          {placeholder}
        </span>
      }
      {errorMessage && 
        <span className={styles.errorMessage}>
          {errorMessage}
        </span>
      }
      <input 
        className={cn(styles.input, {[styles.inputError]: errorMessage})}
        value={customValue ?? ""}
        ref={ref}
        placeholder={placeholder}
        type={inputType}
        onChange={(e) => change(e)}
        {...props}
      />
      {isPassword && 
       <button onClick={toggleVisible} className={styles.inputButton}>
        {inputType === 'password' ? <EyeIcon /> : <EyeISlashcon />}
      </button>
      }
    </div>
  );
})

Input.displayName = "Input";