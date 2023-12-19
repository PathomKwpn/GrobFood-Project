import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../../util/token/token";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const NavbarAdmin = () => {
  const { clearToken } = useToken();
  const nevigate = useNavigate();
  const getadmin: any = localStorage.getItem("user");
  const admin_info = JSON.parse(getadmin);
  return (
    <div className="w-[100%] px-[12px] py-[6px] md:px-[36px] bg-white">
      <div className="flex justify-between">
        <div className="w-[90px] h-[auto] md:w-[140px] p-1">
          <Link to={"/home"}>
            <img src="../image/logo-grabfood/logo-GrobFood.png" alt="" />
          </Link>
        </div>
        <div className="flex ">
          {/* <div
            className="flex relative justify-center items-center text-[6px] font-semibold text-[#676767] border border-[#f0efef] px-[8px] mx-[6px] rounded-[4px] md:px-[10px]"
            onClick={() => {}}
          ></div> */}
          <div className="flex justify-center items-center border border-[#f0efef] mx-[6px] rounded-[4px]">
            <Link
              to={""}
              className="flex justify-center items-center text-[12px] px-[8px] font-[500] text-[#676767] h-[28px] md:h-[40px]"
              onClick={() => {}}
            >
              {admin_info.firstname}
            </Link>
          </div>
          <div
            className="flex justify-center items-center text-[12px] font-[500] text-[#676767] hover:text-[#ffffff] border border-[#f0efef] px-[8px] mx-[6px] rounded-[4px] gap-[3px] hover:bg-red-400"
            onClick={() => {
              clearToken();
              nevigate("/loginadmin");
            }}
          >
            <ExitToAppIcon />
          </div>
          <div className="flex justify-center items-center text-[12px] font-[500] text-[#676767] border border-[#f0efef] px-[8px] mx-[6px] rounded-[4px] gap-[3px]">
            TH
            <ExpandMoreIcon className="text-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
