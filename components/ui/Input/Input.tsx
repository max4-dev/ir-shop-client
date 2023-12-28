"use client"

import { InputProps } from "./Input.props";
import cn from "classnames";
import EyeIcon from "@/public/images/icons/eye.svg"
import EyeISlashcon from "@/public/images/icons/eye-slash.svg"
import styles from "./Input.module.scss";
import { MouseEvent, useState } from "react";

const Input = ({ placeholder, type, isPassword = false, className, ...props }: InputProps) => {
  const [inputType, setInputType] = useState(type);

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
      {placeholder && <span className={styles.placeholder}>{placeholder}</span>}
      <input className={styles.input} placeholder={placeholder} type={inputType} {...props} />
      {isPassword && 
       <button onClick={toggleVisible} className={styles.inputButton}>
        {inputType === 'password' ? <EyeIcon /> : <EyeISlashcon />}
      </button>
      }
    </div>
  );
}
 
export default Input;