import React from "react";
import { Navbarauth } from "../Home/components";
import { StoreList_container } from "./components";
import Login from "../Login-pages/Login";
import Footer from "../Footer/Footer";
const StoreListHome = ({ clearToken }) => {
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  return (
    <div className="bg-[#eeeeee]">
      <Navbarauth clearToken={clearToken} />
      <StoreList_container />
      <Footer />
    </div>
  );
};

export default StoreListHome;
