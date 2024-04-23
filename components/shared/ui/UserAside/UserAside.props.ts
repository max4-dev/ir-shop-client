import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IUser } from "@/redux/auth/types";

export interface UserAsideProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  profile: IUser;
}
