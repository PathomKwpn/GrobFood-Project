// import React, { useEffect, useState } from "react";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import StoreIcon from "@mui/icons-material/Store";
import axios from "axios";
import { GROBFOOD_USER_URL } from "../../../util/constants/constant";
import { useEffect, useState } from "react";
import { useToken } from "../../../util/token/token";
interface storeOrderList {
  addres_detail: string;
  bill_date: string;
  bill_id: string;
  bill_status: string;
  coupon_id: string;
  create_date: string;
  discount: string;
  driver_id: string;
  last_price: string;
  note_to_driver: string;
  paymethod: string;
  restaurant_id: string;
  restaurant_latitude: string;
  restaurant_longitude: string;
  restaurant_name: string;
  shipping_cost: string;
  total_price: string;
  userPhone: string;
  user_id: string;
  user_latitude: string;
  user_longitude: string;
}
const NavbarOwnerAuth = ({ clearToken, sendOwner_id }: any) => {
  const { updateToken } = useToken();
  const [storeOrderListCount, setStoreOrderListCount] = useState<
    Array<storeOrderList> | "คุณยังไม่มีร้านค้า"
  >([]);
  const getStoreOrderList = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getStoreOrderList`,
      data
    );
    if (response.data.success) {
      setStoreOrderListCount(response.data.data);
    } else {
      console.log("err");
    }
  };
  useEffect(() => {
    getStoreOrderList(sendOwner_id);
  }, []);

  const nevigate = useNavigate();
  const getOwner: any = localStorage.getItem("user");
  let ownerInfo = JSON.parse(getOwner);
  return (
    <>
      <div className="flex justify-center items-center h-[48px] md:h-[88px] sticky bg-white shadow-sm">
        <div className="w-[100%] px-[12px] md:px-[36px]">
          <div className="flex justify-between">
            <div className="w-[90px] h-[auto] md:w-[140px] p-1">
              <Link to={"/ownerhome"}>
                <img src="../image/logo-grabfood/logo-GrobFood.png" alt="" />
              </Link>
            </div>
            <div className="flex ">
              <div
                className="flex relative justify-center items-center text-[12px] font-[500] text-[#676767] hover:text-[#ffffff] border border-[#f0efef] px-[8px] mx-[6px] rounded-[4px] gap-[3px] hover:bg-red-400"
                onClick={() => {
                  updateToken();
                  nevigate("/ownerstoreorderlist");
                }}
              >
                {storeOrderListCount != "คุณยังไม่มีร้านค้า" && (
                  <span className="bg-[red] w-[16px] h-[16px] flex justify-center items-center rounded-[50%] text-[white] absolute top-[-4px] right-[-4px]">
                    {storeOrderListCount.length}
                  </span>
                )}
                <StoreIcon />
              </div>
              <div className="flex justify-center items-center border min-w-[100px] md:min-w-[150px] border-[#e1e1e1] mx-[6px] rounded-[4px] shadow-sm hover:bg-[#009C49] hover:text-[#ffffff]">
                <Link
                  to={"/ownerstore-detail"}
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
