import { TypeOptions, toast } from "react-toastify";

export const notify = ({ message, type }: { message: string, type: TypeOptions  | undefined }) => toast(message, {
  type,
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
});
