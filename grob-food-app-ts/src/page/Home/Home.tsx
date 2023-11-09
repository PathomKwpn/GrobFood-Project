import React from "react";
import {
  Catagory,
  DetailQuestion,
  Header,
  Navbar,
  Promotion,
} from "../../page/Home/components/";
import Footer from "../Footer/Footer";
const Home = ({ clearToken, token, user }) => {
  return (
    <>
      <Navbar clearToken={clearToken} token={token} user={user} />
      <Header />
      <Promotion />
      <Catagory />
      <DetailQuestion />
      <Footer />
    </>
  );
};

export default Home;
