import Header from "../components/common/Header/Header";
import Footer from "../components/common/Footer/Footer";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
