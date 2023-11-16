import React from "react";
import {
  Catagory,
  DetailQuestion,
  Header,
  Navbarauth,
  Promotion,
} from "../../page/Home/components/";
import Login from "../Login-pages/Login";
import Footer from "../Footer/Footer";
const Home = ({ clearToken, token, user, saveLocation }) => {
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  return (
    <>
      <Navbarauth clearToken={clearToken} token={token} user={user} />
      <Header saveLocation={saveLocation} />
      <Promotion />
      <Catagory />
      <DetailQuestion />
      <Footer />
    </>
  );
};

export default Home;
