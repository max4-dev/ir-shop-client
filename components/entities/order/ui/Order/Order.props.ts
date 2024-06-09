import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IOrder } from "../../types/index";

export type OrderProps = IOrder & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
