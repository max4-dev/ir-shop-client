"use client";

import { forwardRef } from "react";
import Image from "next/image";

import { useAppDispatch } from "@/redux/store";
import { setAddress } from "@/redux/address/slice";

import { Button } from "../Button/Button";

import { CitySearchProps } from "./CitySearch.props";
import styles from "./CitySearch.module.scss";

export const CitySearch = forwardRef<HTMLInputElement, CitySearchProps>(
  ({ ...props }: CitySearchProps, ref) => {
    const dispatch = useAppDispatch();

    const saveAddress = () => {
      if (props.value) {
        dispatch(setAddress(String(props.value)));
      }
    };

    return (
      <div className={styles.search}>
        <input
          ref={ref}
          type="text"
          className={props.className}
          placeholder="Ваш город..."
          {...props}
          onBlur={undefined}
        />
        <Image
          className={styles.searchIcon}
          src="/images/icons/search.svg"
          alt="Поиск"
          width={14}
          height={14}
        />
        <Button onClick={saveAddress} className={styles.searchButton} size="small">
          Сохранить
        </Button>
      </div>
    );
  }
);

CitySearch.displayName = "Input";
