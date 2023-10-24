import React from "react";
import {
  Catagory,
  DetailQuestion,
  Header,
  Navbar,
  Promotion,
} from "../../page/Home/components/";

const Home = ({ clearToken, token, user }) => {
  return (
    <>
      <Navbar clearToken={clearToken} token={token} user={user} />
      <Header />
      <Promotion />
      <Catagory />
      <DetailQuestion />
    </>
  );
};

export default Home;
