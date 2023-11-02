import React from "react";
import { Navbarauth } from "../Home/components";
import { Container } from "./components/index";
const UserProfile = ({ clearToken, token, user }) => {
  return (
    <div className=" bg-[green] w-full min-h-[100vh] h-[auto]">
      <Navbarauth clearToken={clearToken} token={token} user={user} />
      <Container />
    </div>
  );
};

export default UserProfile;
