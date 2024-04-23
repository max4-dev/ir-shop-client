"use client";

import cn from "classnames";
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from "react-dadata";
import { useState } from "react";

import { CitySearch } from "../CitySearch/CitySearch";

import { CityMenuProps } from "./CityMenu.props";
import styles from "./CityMenu.module.scss";

export function CityMenu({ className, ...props }: CityMenuProps) {
  const [value, setValue] = useState<DaDataSuggestion<DaDataAddress>>();

  return (
    <div className={cn(className, styles.menu)} {...props}>
      <div className={styles.menuSearch}>
        <AddressSuggestions
          customInput={CitySearch}
          renderOption={(suggestion) => {
            return <div>{suggestion.value}</div>;
          }}
          delay={250}
          containerClassName={styles.menuItems}
          suggestionClassName={styles.menuItem}
          token={process.env.NEXT_PUBLIC_DADATA_KEY || ""}
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  );
}
