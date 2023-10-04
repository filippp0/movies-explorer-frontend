import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

export default function ProtectedHome({ ...props }) {
  return (
    <>
      <Header />
      <Main {...props} />
      <Footer />
    </>
  )
}
