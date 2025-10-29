import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const FontLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={montserrat.className}>{children}</div>;
};
