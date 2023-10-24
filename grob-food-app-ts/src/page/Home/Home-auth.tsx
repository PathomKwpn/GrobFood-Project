import React from "react";
import { Catagory, Header, Navbarauth, Promotion } from "../../page/Home/components/";

const Home = ({ clearToken, token, user }) => {
  return (
    <>
      <Navbarauth clearToken={clearToken} token={token} user={user} />
      <Header />
      <Promotion />
      <Catagory />
    </>
  );
};

export default Home;
