import {
  Catagory,
  DetailQuestion,
  Header,
  Navbar,
  Promotion,
} from "../../page/Home/components/";
import Footer from "../Footer/Footer";
const Home = ({ token, user, saveLocation }: any) => {
  return (
    <>
      <Navbar token={token} user={user} />
      <Header saveLocation={saveLocation} />
      <Promotion />
      <Catagory />
      <DetailQuestion />
      <Footer />
    </>
  );
};

export default Home;
