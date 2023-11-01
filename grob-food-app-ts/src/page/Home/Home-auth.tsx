import React from "react";
import {
  Catagory,
  DetailQuestion,
  Header,
  Navbarauth,
  Promotion,
} from "../../page/Home/components/";
import Login from "../Login-pages/Login";

const Home = ({ clearToken, token, user }) => {
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  return (
    <>
      <Navbarauth clearToken={clearToken} token={token} user={user} />
      <Header />
      <Promotion />
      <Catagory />
      <DetailQuestion />
    </>
  );
};

export default Home;
