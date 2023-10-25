import React from "react";
import NavbarOwnerAuth from "./NavbarAuth/NavbarAuth";
import OwnerContainer from "./Owner-Container/OwnerContainer";
import Login from "../Login-pages/Login";
import { useNavigate } from "react-router-dom";
const OwnerHome = ({ clearToken, token, user }) => {
  const nevigate = useNavigate();
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  return (
    <div className="bg-[#d6d6d6] h-[auto] min-h-[100vh] md:h-[100vh]">
      <NavbarOwnerAuth clearToken={clearToken} token={token} user={user} />
      <OwnerContainer />
    </div>
  );
};

export default OwnerHome;
