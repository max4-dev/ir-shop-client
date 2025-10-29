import { TypeOptions, toast } from "react-toastify";

import { TOAST_CONFIG } from "../config";

export const notify = ({ message, type }: { message: string; type: TypeOptions | undefined }) =>
  toast(message, {
    type,
    ...TOAST_CONFIG,
  });
