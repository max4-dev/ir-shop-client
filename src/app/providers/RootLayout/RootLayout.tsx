import "@src/app/styles/style.scss";
import { FontLayout } from "../FontLayout/FontLayout";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <FontLayout>{children}</FontLayout>;
};
