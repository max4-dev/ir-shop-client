import { DetailedHTMLProps, HTMLAttributes } from "react";

import { ProfileMenuItem } from "../../types";

export type ProfileMenuProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  items: ProfileMenuItem[];
};
