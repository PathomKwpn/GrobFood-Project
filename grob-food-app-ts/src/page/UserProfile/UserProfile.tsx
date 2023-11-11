import React from "react";
import { Navbarauth } from "../Home/components";
import { Container } from "./components/index";
import { useNavigate } from "react-router-dom";
import Login from "../Login-pages/Login";
const UserProfile = ({ clearToken, token, user }) => {
  const nevigate = useNavigate();
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  return (
    <div className=" bg-[green] w-full min-h-[100vh] h-[auto] pt-[100px]">
      <Navbarauth clearToken={clearToken} token={token} user={user} />
      <Container />
    </div>
  );
};

export default UserProfile;
