import React from "react";
import { Navbarauth } from "../Home/components";
import { StoreList_container } from "./components";
import Login from "../Login-pages/Login";
const StoreListHome = ({ clearToken }) => {
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  return (
    <div>
      <Navbarauth clearToken={clearToken} />
      <StoreList_container />
    </div>
  );
};

export default StoreListHome;
