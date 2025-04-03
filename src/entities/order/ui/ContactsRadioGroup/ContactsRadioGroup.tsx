import { RadioGroup } from "@headlessui/react";
import cn from "classnames";

import { ContactType } from "@/src/shared/types";
import { RadioItem } from "@/src/shared/ui";

import { ContactsRadioGroupProps } from "./ContactsRadioGroup.props";
import styles from "./ContactsRadioGroup.module.css";

export const ContactsRadioGroup = ({ className, field, handleChangeContactType }: ContactsRadioGroupProps) => {
  return (
    <RadioGroup
      className={cn(className, styles.radioGroup)}
      {...field}
      onChange={(e) => handleChangeContactType(e, field.onChange)}
      aria-label="Выберите способ связи"
    >
      <RadioItem value={ContactType.Telegram} label="Telegram" />
      <RadioItem value={ContactType.Whatsapp} label="Whatsapp" />
      <RadioItem value={ContactType.Phone} label="По телефону" />
    </RadioGroup>
  );
};