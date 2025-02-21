import { Footer } from "../widgets/footer/ui";
import { Header } from "../widgets/header/ui";
import "./scss/style.scss";

function RootTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}

export default RootTemplate;
