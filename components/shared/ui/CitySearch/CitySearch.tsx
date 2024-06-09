"use client";

import { forwardRef } from "react";

import { Icon } from "../Icon/Icon";

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
          placeholder="Адрес почты..."
          {...props}
          onBlur={undefined}
        />
        <Icon.SearchIcon className={styles.searchIcon} />
      </div>
    );
  }
);

CitySearch.displayName = "Input";
