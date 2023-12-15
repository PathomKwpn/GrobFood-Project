import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
import { useEffect, useState } from "react";
//ICON
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReceiptIcon from "@mui/icons-material/Receipt";

import FastfoodIcon from "@mui/icons-material/Fastfood";
import Login from "../Login-pages/Login";
import NavbarOwnerAuth from "./NavbarAuth/NavbarAuth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
interface menuList {
  price: string;
  amount: number;
  menu_name: string;
}

interface storeOrderDetail {
  addres_detail: string | null;
  bill_date: string;
  bill_id: string;
  bill_status: string;
  coupon_id: string | null;
  create_date: string;
  discount: string | number;
  driver_id: string;
  last_price: string | number;
  note_to_driver: string | null;
  paymethod: string;
  restaurant_id: string;
  shipping_cost: string | number;
  total_price: string | number;
  user_id: string;
  menulist: Array<menuList>;
  user_latitude: string | number;
  user_longitude: string | number;
  userPhone: string;
  restaurant_name: string;
  restaurant_latitude: string;
  restaurant_longitude: string;
}
const OwernerStoreOrderDetail = ({ clearToken }: any) => {
  const getOwner: any = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  const nevigate = useNavigate();
  //PARAM
  const { billID } = useParams();
  const order_billID = { bill_id: billID };

  const [storeOrderDetail, setStoreOrderDetail] = useState<
    Array<storeOrderDetail>
  >([]);
  const getStoreOrderDetail = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getStoreOrderDetail`,
      data
    );
    if (response.data.success) {
      setStoreOrderDetail(response.data.data);
    } else {
      console.log("GET STOREORDER ERROR");
    }
  };
  useEffect(() => {
    getStoreOrderDetail(order_billID);
  }, []);
  let billDay;
  let billMonth;
  let billYear;
  if (storeOrderDetail.length != 0) {
    let createDate = new Date(storeOrderDetail[0].bill_date);
    billDay = createDate.getDate();
    billMonth = createDate.getMonth();
    billYear = createDate.getFullYear();
  }
  const owner_info = JSON.parse(getOwner);
  const owner_id = owner_info.id;
  const sendOwner_id = { owner_id: owner_id };
  return (
    <div className=" bg-[#01B14F] min-h-[100vh]">
      <NavbarOwnerAuth clearToken={clearToken} sendOwner_id={sendOwner_id} />
      <div
        className="mt-[24px] underline md:px-[24px] px-[8px] text-white"
        onClick={() => {
          nevigate("/ownerhome");
        }}
      >
        <ArrowBackIcon className="text-[18px] text-white" />
        กลับไปหน้าหลัก
      </div>
      <header className="text-[32px] lg:text-[42px] text-[white] font-bold w-full flex justify-center my-[24px]">
        ข้อมูลออเดอร์
      </header>
      {storeOrderDetail.length != 0 && (
        <div className="flex justify-center w-full md:max-w-[600px] m-auto shadow-md">
          <div className="w-full bg-white rounded-xl">
            <header className="flex flex-col justify-center items-center w-full mt-[52px]">
              <p className="flex items-center justify-center">
                วันที่ : {billDay} / {billMonth} / {billYear}
              </p>
              <p className="text-[20px] md:text-[24px] font-bold text-center my-[6px]">
                {storeOrderDetail[0].restaurant_name}
              </p>
              <p className="text-[12px] flex items-center md:text-[14px]">
                <LocationOnIcon className="text-[#da7929]" />
                {storeOrderDetail[0].user_latitude},
                {storeOrderDetail[0].restaurant_longitude}
              </p>
            </header>

            <div className="flex flex-col items-center justify-center mt-[48px]">
              <FastfoodIcon className="text-[36px]" />
              <p className="w-full flex justify-center text-[18px] font-bold my-[12px]">
                รายการอาหาร
              </p>
              <div className="w-[90%]">
                {storeOrderDetail[0].menulist?.map((list) => (
                  <div
                    className="w-full flex flex-row justify-between"
                    key={list.menu_name}
                  >
                    <span className="font-bold">{list.amount}x</span>
                    <span>{list.menu_name}</span>
                    <span>{list.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center my-[24px]">
              <ReceiptIcon className="text-[36px]" />
              <header className="text-[18px] font-bold my-[12px]">
                สรุปคำสั่งซื้อ
              </header>
              <div className="w-[90%]">
                <div className="flex justify-between">
                  <span className="font-bold">รวมค่าอาหาร </span>
                  {storeOrderDetail[0].total_price}
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">ค่าส่ง </span>
                  {storeOrderDetail[0].shipping_cost}
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">ส่วนลด </span>
                  {storeOrderDetail[0].discount}
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">รวมทั้งหมด </span>
                  {storeOrderDetail[0].last_price}
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">รูปแบบการจ่ายเงิน </span>
                  {storeOrderDetail[0].paymethod}
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">เบอร์โทรติดต่อ </span>
                  {storeOrderDetail[0].userPhone}
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">latitude : </span>
                  {storeOrderDetail[0].user_latitude}
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">longitude : </span>
                  {storeOrderDetail[0].user_longitude}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwernerStoreOrderDetail;
