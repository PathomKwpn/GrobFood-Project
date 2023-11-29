import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useToken } from "../../util/token/token";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Alert, Button } from "@mui/material";
import gifDriver from "../../../public/image/grab-driver/giphy.gif";
import axios from "axios";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
const DeliveryPage = () => {
  const nevigate = useNavigate();

  //GET USER FROM LOCALSTORAGE
  const user_name: any = localStorage.getItem("user");
  let user_firstname = JSON.parse(user_name);
  //GET CART FROM LOCALSTORAGE
  const cart: any = localStorage.getItem("cart");
  let user_cart = JSON.parse(cart);

  //POPUP STATE
  const [alertNoMenu, setAlertNoMenu] = useState<"active" | "close">("close");
  const [cartState, setCartState] = useState<"open" | "close">("close");

  const { updateToken, clearToken } = useToken();
  const getUserBill = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/getuserbill`, data);
    if (response.data.success) {
      console.log("create already");
    } else {
      console.log("Error");
      alert("คุณมีคำสั่งซื้อที่กำลังดำเนินการอยู่");
    }
  };
  //CALC TOTALPRICE
  let totalprice = 0;
  for (let i = 0; i < user_cart.length; i++) {
    totalprice += Number(user_cart[i].menu_totalprice);
  }

  //CART
  return (
    <div className="bg-slate-500">
      <nav className="flex fixed z-[1000] justify-center items-center h-[48px] md:h-[88px]  top-0 bg-white shadow-sm w-full">
        <div className="w-[100%] px-[12px] md:px-[36px]">
          <div className="flex justify-between">
            <div className="w-[90px] h-[auto] md:w-[140px] p-1">
              <Link to={"/home"}>
                <img src="../image/logo-grabfood/logo-GrobFood.png" alt="" />
              </Link>
            </div>
            <div className="flex ">
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
                className="flex justify-center cursor-pointer items-center text-[12px] font-[500] text-[#676767] hover:text-[#ffffff] border border-[#f0efef] px-[8px] mx-[6px] rounded-[4px] gap-[3px] hover:bg-red-400"
                onClick={() => {
                  clearToken();
                  nevigate("/login");
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
      </nav>
      <header className="w-full flex h-[400px] flex-col justify-center items-center mt-[100px]">
        <img
          className="max-w-[300px] bg-cover bmax-h-[300px]"
          src={gifDriver}
          alt="driver-dance"
        />
        <p className="text-[26px] font-bold my-[10px]">
          เรากำลังหาคนขับให้คุณ..
        </p>
      </header>
      <div className="h-[auto] mt-[20px] max-w-[700px] md:w-[50%] bg-white rounded-md w-[95%]">
        <div className="border-b-[1px] py-[16px]">
          <span className="text-[24px] font-[500] px-[5%]">สรุปคำสั่งซื้อ</span>
        </div>

        <div className="my-[40px] px-[20px]">
          <div className="flex justify-between">
            <span>รวมค่าอาหาร</span> <span>฿ {totalprice}</span>
          </div>
          <div className="flex justify-between">
            <span>ส่วนลด</span> <span>฿ </span>
          </div>
          <div className="flex justify-between">
            <span>ค่าส่ง</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
