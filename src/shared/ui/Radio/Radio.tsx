import { Radio as HeadlessUIRadio } from "@headlessui/react";

import styles from "./Radio.module.scss";
import { RadioProps } from "./Radio.props";

export const Radio = ({ className, value, label, ref, ...props }: RadioProps) => {
  return (
    <div className={className}>
      <HeadlessUIRadio ref={ref} className={styles.radio} value={value} {...props}>
        <div className={styles.radioIcon}>
          <span />
        </div>
        {label}
      </HeadlessUIRadio>
    </div>
  );
};
