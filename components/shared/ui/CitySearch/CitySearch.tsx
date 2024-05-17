"use client";

import { forwardRef } from "react";
import Image from "next/image";

import { CitySearchProps } from "./CitySearch.props";
import styles from "./CitySearch.module.scss";

export const CitySearch = forwardRef<HTMLInputElement, CitySearchProps>(
  ({ ...props }: CitySearchProps, ref) => {
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
      </div>
    );
  }
);

CitySearch.displayName = "Input";
