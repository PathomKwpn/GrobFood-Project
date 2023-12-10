import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//ICON
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Person2Icon from "@mui/icons-material/Person2";
import ListIcon from "@mui/icons-material/List";
import { useToken } from "../../../util/token/token";
const NavbarDriver = () => {
  //STATE
  const [profileState, setProfileState] = useState<true | false>(false);
  const nevigate = useNavigate();
  const { clearToken } = useToken();
  const getOwner: any = localStorage.getItem("user");
  let ownerInfo = JSON.parse(getOwner);
  return (
    <>
      <div className="flex justify-center items-center h-[48px] md:h-[88px] max-h-[90px] sticky bg-white shadow-sm">
        <div className="w-[100%] px-[12px] md:px-[36px] max-h-[50px]">
          <div className="flex justify-between overflow-auto mt-[10px] md:mt-[0px]">
            <div className="w-[90px] h-[auto] md:w-[140px] p-1">
              <Link to={"/driverhome"}>
                <img src="./image/logo-grabfood/logo-GrobFood.png" alt="" />
              </Link>
            </div>
            <div className="flex flex-col overflow-visible">
              <div
                className="flex justify-center items-center border min-w-[100px] md:min-w-[150px] border-[#e1e1e1] mx-[6px] rounded-[4px] shadow-sm hover:bg-[#009C49] hover:text-[#ffffff]"
                onClick={() => {
                  setProfileState(!profileState);
                }}
              >
                <Link
                  to={""}
                  className="flex justify-center items-center text-[12px] px-[8px] font-[500] text-[#676767] hover:text-[#ffffff] h-[28px] md:h-[40px] md:text-[14px] w-full"
                >
                  {ownerInfo.firstname}
                </Link>
              </div>
              {profileState == true && (
                <div className="flex justify-center  border min-w-[100px] md:min-w-[150px] bg-white border-[#e1e1e1] mx-[6px] rounded-[4px] shadow-sm absolute top-[50px] md:top-[70px] z-[80]">
                  <ul className="flex flex-col justify-center w-full">
                    <li
                      className="text-[14px] py-[4px] border-b-[1px] w-full flex justify-center items-center cursor-pointer"
                      onClick={() => {
                        nevigate("/driverprofile");
                      }}
                    >
                      ข้อมูลส่วนตัว <Person2Icon />
                    </li>
                    <li
                      className="text-[14px] py-[4px] border-b-[1px] w-full flex justify-center items-center cursor-pointer"
                      onClick={() => {
                        nevigate("/driverhistory");
                      }}
                    >
                      ประวัติงาน <ListIcon />
                    </li>
                    <li
                      className="text-[14px] py-[4px] border-b-[1px] w-full flex justify-center items-center  cursor-pointer"
                      onClick={() => {
                        clearToken();
                        nevigate("/login");
                        console.log("logout");
                      }}
                    >
                      ออกจากระบบ <ExitToAppIcon />
                    </li>
                  </ul>
                </div>
              )}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarDriver;
