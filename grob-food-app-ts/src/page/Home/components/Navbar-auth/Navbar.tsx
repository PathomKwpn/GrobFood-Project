import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useToken } from "../../../../util/token/token";
const Navbarauth = ({ token, user }) => {
  const nevigate = useNavigate();
  const user_name: any = localStorage.getItem("user");
  const cart: any = localStorage.getItem("cart");
  let user_cart = JSON.parse(cart);
  console.log(user_cart);
  const [cartState, setCartState] = useState<"open" | "close">("close");
  let user_firstname = JSON.parse(user_name);
  console.log(user_name);
  const { updateToken, clearToken, createCarttoLocalStorage } = useToken();
  return (
    <>
      <div className="flex  justify-center items-center h-[48px] md:h-[88px] sticky bg-white shadow-sm">
        {cartState == "open" && (
          <div className=" fixed w-[100%] min-h-[100vh] translate-y-[0%] top-0 bg-white z-20 max-w-[600px]">
            <div
              className="h-[60px] flex items-center border-b-[1px]"
              onClick={() => {
                setCartState("close");
              }}
            >
              <CloseIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] font-[500]">ตะกร้า</span>
              <span>เวลาจัดส่ง</span>
            </div>
            <div>
              {user_cart.map((item) => {
                console.log(item);

                return (
                  <div>
                    <div>
                      <div>{item.menu_name}</div>
                      <div>{item.menu_price}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="w-[100%] px-[12px] md:px-[36px]">
          <div className="flex justify-between">
            <div className="w-[90px] h-[auto] md:w-[140px] p-1">
              <Link to={"/home"}>
                <img src="../image/logo-grabfood/logo-GrobFood.png" alt="" />
              </Link>
            </div>
            <div className="flex ">
              <div
                className="flex relative justify-center items-center text-[6px] font-semibold text-[#676767] border border-[#f0efef] px-[8px] mx-[6px] rounded-[4px] md:px-[10px]"
                onClick={() => {
                  setCartState("open");
                }}
              >
                <ShoppingBagOutlinedIcon className="text-[#676767] text-[20px]" />
                <div className=" absolute text-[14px] right-[-40%] top-[10%] m-0 p-0 translate-x-[-50%] translate-y-[-50%] bg-red-500 w-[20px] h-[20px] flex justify-center items-center rounded-[50%]">
                  <span className="text-white font-[300]">
                    {user_cart.length}
                  </span>
                </div>
              </div>
              <div className="flex justify-center items-center border border-[#f0efef] mx-[6px] rounded-[4px]">
                <Link
                  to={""}
                  className="flex justify-center items-center text-[12px] px-[8px] font-[500] text-[#676767] h-[28px] md:h-[40px]"
                  onClick={() => {
                    updateToken();
                    nevigate("/userprofile");
                  }}
                >
                  {user_firstname.firstname}
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

export default Navbarauth;
