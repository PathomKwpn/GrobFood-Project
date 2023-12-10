import NavbarAuth from "../Owner-Home/NavbarAuth/NavbarAuth";
import StoreDetail from "./OwnerStoreDetailPages/StoreDetail";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Login from "../Login-pages/Login";
const OwnerStoreDetail = ({ clearToken, token, user }: any) => {
  const nevigate = useNavigate();
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  return (
    <div className="bg-[#0DA152] w-full min-h-[100vh] h-[auto]">
      <NavbarAuth clearToken={clearToken} token={token} user={user} />
      <div className="text-[white] mt-[15px] ml-[10%] underline cursor-pointer">
        <span
          onClick={() => {
            nevigate("/ownerhome");
          }}
        >
          <ArrowBackIcon className="text-[18px] text-white" />
          กลับหน้าหลัก
        </span>
      </div>
      <StoreDetail />
    </div>
  );
};

export default OwnerStoreDetail;
