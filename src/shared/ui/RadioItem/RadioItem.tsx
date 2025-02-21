import { Radio } from '@headlessui/react';

import { RadioItemProps } from "./RadioItem.props";
import styles from "./RadioItem.module.scss";

export const RadioItem = ({ className, value, label, ref, ...props }: RadioItemProps) => {
  return (
    <div className={className}>
      <Radio ref={ref} className={styles.radio} value={value} {...props}>
        <div className={styles.radioIcon}>
          <span />
        </div>
        {label}
      </Radio>
    </div>
  );
};