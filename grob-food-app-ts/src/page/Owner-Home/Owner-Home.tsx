import NavbarOwnerAuth from "./NavbarAuth/NavbarAuth";
import OwnerContainer from "./Owner-Container/OwnerContainer";
import Login from "../Login-pages/Login";
// import { useNavigate } from "react-router-dom";
const OwnerHome = ({ clearToken }: any) => {
  // const nevigate = useNavigate();
  const getOwner: any = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  const owner_info = JSON.parse(getOwner);
  const owner_id = owner_info.id;
  const sendOwner_id = { owner_id: owner_id };

  return (
    <div className=" bg-[#01B14F] h-[auto] min-h-[100vh] md:h-[100vh]">
      <NavbarOwnerAuth clearToken={clearToken} sendOwner_id={sendOwner_id} />
      <OwnerContainer />
    </div>
  );
};

export default OwnerHome;
