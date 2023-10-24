import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
const NavbarOwnerAuth = ({ clearToken, token, user }) => {
  const nevigate = useNavigate();
  console.log(user, token, "userTOKEN");
  const getOwner = localStorage.getItem("user");
  let ownerInfo = JSON.parse(getOwner);
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
              <div className="flex justify-center items-center border min-w-[100px] md:min-w-[150px] border-[#e1e1e1] mx-[6px] rounded-[4px] shadow-sm hover:bg-[#009C49] hover:text-[#ffffff]">
                <Link
                  to={"/register"}
                  className="flex justify-center items-center text-[12px] px-[8px] font-[500] text-[#676767] hover:text-[#ffffff] h-[28px] md:h-[40px] md:text-[14px] w-full"
                >
                  {ownerInfo.firstname}
                </Link>
              </div>
              <div
                className="flex justify-center items-center text-[12px] font-[500] text-[#676767] hover:text-[#ffffff] border border-[#f0efef] px-[8px] mx-[6px] rounded-[4px] gap-[3px] hover:bg-red-400"
                onClick={() => {
                  clearToken();
                  nevigate("/login");
                  console.log("logout");
                }}
              >
                <ExitToAppIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarOwnerAuth;
