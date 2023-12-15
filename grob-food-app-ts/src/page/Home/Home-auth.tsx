import {
  Catagory,
  DetailQuestion,
  Header,
  Navbarauth,
  Promotion,
} from "../../page/Home/components/";
import Login from "../Login-pages/Login";
import Footer from "../Footer/Footer";
const Home = ({ saveLocation }: any) => {
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  return (
    <>
      <Navbarauth />
      <Header saveLocation={saveLocation} />
      <Promotion />
      <Catagory />
      <DetailQuestion />
      <Footer />
    </>
  );
};

export default Home;
