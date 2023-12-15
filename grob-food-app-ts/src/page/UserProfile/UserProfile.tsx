import { Navbarauth } from "../Home/components";
import { Container } from "./components/index";

import Login from "../Login-pages/Login";
const UserProfile = () => {
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  return (
    <div className=" bg-[green] w-full min-h-[100vh] h-[auto] pt-[100px] ">
      <Navbarauth />
      <Container />
    </div>
  );
};

export default UserProfile;
