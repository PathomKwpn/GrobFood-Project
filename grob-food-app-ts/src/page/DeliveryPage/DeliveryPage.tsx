import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useToken } from "../../util/token/token";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Alert, Button, MenuList } from "@mui/material";
import gifDriver from "../../../public/image/grab-driver/giphy.gif";
import axios from "axios";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
const DeliveryPage = () => {
  const nevigate = useNavigate();

  //GET USER FROM LOCALSTORAGE
  const user_name: any = localStorage.getItem("user");
  let user_info = JSON.parse(user_name);
  let user_id = { user_id: user_info.id };
  console.log(user_id);

  //GET CART FROM LOCALSTORAGE
  const cart: any = localStorage.getItem("cart");
  let user_cart = JSON.parse(cart);

  //POPUP STATE
  const [alertNoMenu, setAlertNoMenu] = useState<"active" | "close">("close");
  const [cartState, setCartState] = useState<"open" | "close">("close");
  const [memuList, setMenuList] = useState();
  const [billDetail, setBillDetail] = useState([]);
  const { updateToken, clearToken } = useToken();
  const getBillmenuList = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getbillmenulist`,
      data
    );
    if (response.data.success) {
      setMenuList(response.data.data);
      console.log("get cart already");
      console.log(response.data.data);
      console.log(memuList);
    } else {
      console.log("Error");
    }
  };
  const getUserBill = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/getuserbill`, data);
    if (response.data.success) {
      setBillDetail(response.data.data);
      console.log(billDetail);
      console.log(response.data.data);
      let getBilmenu = { bill_id: response.data.data[0].bill_id };
      console.log(getBilmenu);

      getBillmenuList(getBilmenu);
    } else {
      console.log("Error");
    }
  };

  //CALC TOTALPRICE
  let totalprice = 0;
  for (let i = 0; i < user_cart.length; i++) {
    totalprice += Number(user_cart[i].menu_totalprice);
  }
  useEffect(() => {
    console.log(user_id);
    getUserBill(user_id);
  }, []);
  console.log(billDetail[0]);
  console.log(memuList);

  //CART
  return (
    <div className="bg-slate-100 min-h-[100vh] flex flex-col  items-center">
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
                  {user_info.firstname}
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
      <header className="w-full flex h-[400px] flex-col justify-center items-center mt-[30px] md:mt-[80px]">
        <img
          className="max-w-[300px] bg-cover bmax-h-[300px]"
          src={gifDriver}
          alt="driver-dance"
        />
        <p className="text-[26px] font-bold my-[10px]">
          เรากำลังหาคนขับให้คุณ..
        </p>
      </header>
      {billDetail.length != 0 && (
        <div className="h-[auto] mt-[20px]  md:w-[50%] bg-white rounded-md w-[95%] max-w-[300px] mx-[10px] shadow-sm">
          <div className="border-b-[1px] py-[16px]">
            <span className="text-[24px] font-[500] px-[5%]">
              สรุปคำสั่งซื้อ
            </span>
          </div>
          <div className="flex justify-center flex-col items-center w-full">
            <div className="my-[16px] font-bold text-[18px]">รายการอาหาร</div>
            {memuList != undefined && (
              <div className="w-full px-[16px]">
                {memuList?.map((order) => {
                  return (
                    <div
                      key={order.menu_id}
                      className="flex justify-between w-[100%]"
                    >
                      <span>{order.amount}x </span>
                      <span className="text-[#5a5a5a]">{order.menu_name}</span>
                      <span>{order.price}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="my-[40px] px-[20px]">
            <div className="flex justify-between">
              <span>รวมค่าอาหาร</span> <span>฿{billDetail[0].total_price}</span>
            </div>
            <div className="flex justify-between">
              <span>ส่วนลด</span>
              <span>฿{billDetail[0].discount}</span>
            </div>

            <div className="flex justify-between">
              <span>ค่าส่ง</span>
              <span>฿{billDetail[0].shipping_cost}</span>
            </div>
            <div className="flex justify-between mt-[16px]">
              <span className="text-[24px] font-bold">รวมทั้งหมด</span>{" "}
              <span className="flex justify-center items-center">
                ฿{billDetail[0].last_price}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryPage;
