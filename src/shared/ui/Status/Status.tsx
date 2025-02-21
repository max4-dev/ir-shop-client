import cn from "classnames";

import { StatusProps } from "./Status.props";
import styles from "./Status.module.scss";

const statusValues = {
  complete: "Доставлен",
  delivering: "В доставке",
  pending: "Сборка",
  cancel: "Отменен",
};

export const Status = ({ className, status = "pending", ...props }: StatusProps) => {
  return (
    <div className={cn(className, styles.status, styles[status])} {...props}>
      {statusValues[status] || "Ошибка"}
    </div>
  );
};
