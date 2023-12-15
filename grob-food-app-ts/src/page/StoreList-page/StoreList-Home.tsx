import { Navbarauth } from "../Home/components";
import { StoreList_container } from "./components";
import Login from "../Login-pages/Login";
import Footer from "../Footer/Footer";
const StoreListHome = () => {
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  return (
    <div className="bg-[#eeeeee]">
      <Navbarauth />
      <StoreList_container />
      <Footer />
    </div>
  );
};

export default StoreListHome;
