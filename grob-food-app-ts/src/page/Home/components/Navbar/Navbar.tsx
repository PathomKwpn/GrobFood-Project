import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";

const Navbar = ({ token, user }: any) => {
  console.log(user, token, "userTOKEN");

  return (
    <>
      <div className="flex justify-center items-center h-[48px] md:h-[88px] sticky bg-white shadow-sm">
        <div className="w-[100%] px-[12px] md:px-[36px]">
          <div className="flex justify-between">
            <div className="w-[90px] h-[auto] md:w-[140px] p-1">
              <Link to={"/"}>
                <img src="./image/logo-grabfood/logo-GrobFood.png" alt="" />
              </Link>
            </div>
            <div className="flex ">
              <div className="flex justify-center items-center text-[6px] font-semibold text-[#676767] border border-[#f0efef] px-[8px] mx-[6px] rounded-[4px] md:px-[10px]">
                <ShoppingBagOutlinedIcon className="text-[#676767] text-[20px]" />
              </div>
              <div className="flex justify-center items-center border border-[#f0efef] mx-[6px] rounded-[4px]">
                <Link
                  to={"/register"}
                  className="flex justify-center items-center text-[12px] px-[8px] font-[500] text-[#676767] h-[28px] md:h-[40px]"
                >
                  เข้าสู่ระบบ/ลงทะเบียน
                </Link>
              </div>
              {/* <div
                className="flex justify-center items-center text-[12px] font-[500] text-[#676767] hover:text-[#ffffff] border border-[#f0efef] px-[8px] mx-[6px] rounded-[4px] gap-[3px] hover:bg-red-400"
                onClick={() => {
                  clearToken();
                  nevigate("/login");
                  console.log("logout");
                }}
              >
                <ExitToAppIcon />
              </div> */}
              <div className="flex justify-center items-center text-[12px] font-[500] text-[#676767] border border-[#f0efef] px-[8px] mx-[6px] rounded-[4px] gap-[3px]">
                TH
                <ExpandMoreIcon className="text-[18px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
