import cn from "classnames";

import { StatusProps } from "./Status.props";
import styles from "./Status.module.scss";

export const Status = ({className, status = "pending", ...props}: StatusProps) => {
  const statusList = {
    "complete": "Доставлен",
    "pending": "В доставке",
    "cancel": "Отменен",
  }

  return (
    <div className={cn(className, styles.status, styles[status])} {...props}>
      {statusList[status] ? statusList[status] : "Ошибка"}
    </div>
  );
}