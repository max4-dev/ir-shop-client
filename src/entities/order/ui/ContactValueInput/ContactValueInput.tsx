// import cn from 'classnames';
import { ContactType } from "@/src/shared/types";
import { Input, PhoneInput } from "@/src/shared/ui";
import { contact } from "@/src/shared/const/contact";

import { ContactValueInputProps } from "./ContactValueInput.props";
// import styles from './ContactValueInput.module.scss';

export const ContactValueInput = ({
  className,
  contactType,
  onChange,
  ...props
}: ContactValueInputProps) => {
  if (!contactType) {
    return null;
  }

  if (contactType === ContactType.Telegram) {
    return (
      <Input
        className={className}
        onChange={onChange}
        placeholder={contact[contactType]}
        {...props}
      />
    );
  }

  return (
    <PhoneInput
      className={className}
      label={contact[contactType]}
      {...props}
    />
  );
};
