import { DetailedHTMLProps, HTMLAttributes } from "react";

import { UserDTO } from "@/src/redux/auth/types";

export interface UserAsideProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  profile: UserDTO;
}
