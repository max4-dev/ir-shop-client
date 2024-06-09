"use client";

import cn from "classnames";
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from "react-dadata";

import { useAppDispatch } from "@/redux/store";
import { setAddress } from "@/redux/address/slice";

import { CityMenuProps } from "./CityMenu.props";
import styles from "./CityMenu.module.scss";

export function CityMenu({ className, customInput, ...props }: CityMenuProps) {
  const dispatch = useAppDispatch();

  const saveAddress = (city: DaDataSuggestion<DaDataAddress> | undefined) => {
    if (city) {
      dispatch(setAddress(city));
    }
  };

  return (
    <div className={cn(className, styles.menu)} {...props}>
      <div className={styles.menuSearch}>
        <AddressSuggestions
          customInput={customInput}
          renderOption={(suggestion) => {
            return <div>{suggestion.value}</div>;
          }}
          delay={250}
          containerClassName={styles.menuItems}
          suggestionClassName={styles.menuItem}
          token={process.env.NEXT_PUBLIC_DADATA_KEY || ""}
          onChange={saveAddress}
        />
      </div>
    </div>
  );
}
