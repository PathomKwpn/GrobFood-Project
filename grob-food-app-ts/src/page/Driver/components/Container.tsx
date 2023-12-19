// import axios from "axios";
// import React, { useEffect } from "react";
// import { GROBFOOD_USER_URL } from "../../../util/constants/constant";

import { Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MopedIcon from "@mui/icons-material/Moped";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";
import { useToken } from "../../../util/token/token";
import axios from "axios";
import { GROBFOOD_USER_URL } from "../../../util/constants/constant";
interface orderListProps {
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
  user_latitude: string | number;
  user_longitude: string | number;
}
interface menuList {
  price: string;
  amount: number;
  menu_name: string;
}
interface driverWorkListProps {
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
type DriverContainerProps = {
  orderList: Array<orderListProps>;
  driverWorkList: Array<driverWorkListProps>;
  driverAcceptWork: any;
  driver_id: string;
  DriverBillStatus: string;
  endOrderState: boolean;
  alertHaveOrder: boolean;
  haveOrder: boolean;
  getDriverWorkList: any;
  sendDriver_id: any;
  getOrderFindDriver: any;
  setAlertHaveOrder: React.Dispatch<React.SetStateAction<boolean>>;
};
const DriverContainer = ({
  orderList,
  driverWorkList,
  driverAcceptWork,
  driver_id,
  endOrderState,
  alertHaveOrder,
  haveOrder,
  getDriverWorkList,
  sendDriver_id,
  setAlertHaveOrder,
  getOrderFindDriver,
}: DriverContainerProps) => {
  const { updateToken } = useToken();
  const [statePage, setStatePage] = useState("รายการงาน");

  let firstStep = `bg-[#0d990d]`;
  let secondStep = `bg-[#acacac]`;
  let thirdStep = `bg-[#acacac]`;
  let fouthStep = `bg-[#acacac]`;
  let motor1 = `visible`;
  let motor2 = `invisible`;
  let motor3 = `invisible`;
  let motor4 = `invisible`;

  let billDay;
  let billMonth;
  let billYear;
  if (driverWorkList.length != 0) {
    let createDate = new Date(driverWorkList[0].bill_date);
    billDay = createDate.getDate();
    billMonth = createDate.getMonth();
    billYear = createDate.getFullYear();

    if (driverWorkList[0].bill_status == "ถึงร้านอาหารแล้ว") {
      motor1 = `invisible`;
      motor2 = `visible`;
      secondStep = `bg-[#0d990d]`;
    }
    if (driverWorkList[0].bill_status == "กำลังไปส่งอาหาร") {
      motor1 = `invisible`;
      motor2 = `invisible`;
      motor3 = `visible`;
      secondStep = `bg-[#0d990d]`;
      thirdStep = `bg-[#0d990d]`;
    }
    if (driverWorkList[0].bill_status == "คำสั่งซื้อเสร็จสิ้น") {
      motor1 = `invisible`;
      motor2 = `invisible`;
      motor3 = `invisible`;
      motor4 = `visible`;
      secondStep = `bg-[#0d990d]`;
      thirdStep = `bg-[#0d990d]`;
      fouthStep = `bg-[#0d990d]`;
    }
  }
  const updateBillStatus = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/updatebillstatus`,
      data
    );

    if (response.data.success) {
      getDriverWorkList(sendDriver_id);
    } else {
      console.log("ERROR");
    }
  };

  console.log(orderList);

  return (
    <div className="px-[5px] mt-[110px] md:mt-[20px]">
      <div className="w-full flex justify-center gap-3 mt-[24px]">
        <Button
          variant="contained"
          className="bg-[#009C49] md:min-w-[80px] max-w-[400px] focus:bg-[#009C49] hover:bg-[#009C49] z-0 my-[5px]"
          onClick={() => {
            setStatePage("รายการงาน");
            updateToken();
          }}
        >
          รายการงาน
        </Button>
        <Button
          variant="contained"
          className="bg-[#009C49] md:min-w-[80px] max-w-[400px] focus:bg-[#009C49d] hover:bg-[#009C49] z-0 my-[5px]"
          onClick={() => {
            setStatePage("งานของคุณ");
            updateToken();
          }}
        >
          {haveOrder == true && (
            <div className="w-[20px] h-[20px] bg-red-600 absolute top-[-10px] right-[-10px] rounded-xl flex justify-center items-center">
              <PriorityHighIcon className="text-[16px]" />
            </div>
          )}
          งานของคุณ
        </Button>
      </div>

      <header className="text-[32px] font-bold flex justify-center my-[24px]">
        {statePage}
      </header>

      {statePage == "รายการงาน" && (
        <div>
          <div
            className="bg-[#009C49] hover:bg-[rgba(0,156,73,0.78)] w-[100px] flex justify-center items-center py-[8px] rounded-md mb-[12px] mx-[auto]  cursor-pointer"
            onClick={() => {
              getOrderFindDriver();
            }}
          >
            <span className="text-[white] font-bold">REFRESH</span>
            <RefreshIcon className="text-[white] font-bold" />
          </div>

          <div className="flex justify-center">
            <div className="bg-white w-[600px] h-[800px] overflow-scroll border-[1px] border-[#01B14F] rounded-lg">
              <div className="max-w-[800px]">
                <div className="w-full ">
                  <div className=" w-full bg-slate-100 h-[80px] flex flex-nowrap items-center justify-items-center gap-1  ">
                    <div className=" bg-[#009C49] text-[white] min-w-[100px] flex justify-center items-center h-[100%]">
                      รับงาน
                    </div>
                    <div className=" bg-[#009C49] text-[white] min-w-[100px] flex justify-center items-center h-[100%]">
                      สถานะงาน
                    </div>
                    <div className=" bg-[#009C49] text-[white] min-w-[100px] flex justify-center items-center h-[100%]">
                      ชื่อร้าน
                    </div>
                    <div className=" bg-[#009C49] text-[white] min-w-[100px] flex justify-center items-center h-[100%]">
                      ยอดรวม
                    </div>
                    <div className=" bg-[#009C49] text-[white] min-w-[100px] flex justify-center items-center h-[100%]">
                      รูปแบบ
                    </div>
                    <div className=" bg-[#009C49] text-[white] min-w-[100px] flex justify-center items-center h-[100%]">
                      ที่อยู่ลูกค้า
                    </div>
                    <div className=" bg-[#009C49] text-[white] min-w-[100px] flex justify-center items-center h-[100%]">
                      วันที่
                    </div>
                  </div>
                </div>
                {alertHaveOrder == true && (
                  <div className="w-[300px] md:w-[500px] md:top-[180px] absolute top-[120px] translate-x-[-50%] left-[50%] ">
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                      role="alert"
                    >
                      <strong className="font-bold">คำเตือน! </strong>
                      <span className="block sm:inline">
                        คุณมีรายการออเดอร์ที่ยังค้างอยู่.
                      </span>
                      <span
                        className="absolute top-0 bottom-0 right-0 px-4 py-3"
                        onClick={() => {
                          setAlertHaveOrder(false);
                        }}
                      >
                        <svg
                          className="fill-current h-6 w-6 text-red-500"
                          role="button"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <title>Close</title>
                          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                )}
                {orderList?.map((item: any) => {
                  let createDate = new Date(item.bill_date);
                  let regisDay = createDate.getDate();
                  let regisMonth = createDate.getMonth();
                  let regisYear = createDate.getFullYear();
                  return (
                    <div
                      className=" flex flex-nowrap items-center justify-items-center gap-1 "
                      key={item.bill_id}
                    >
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex flex-col items-center justify-center mb-[4px] overflow-hidden">
                        <Button
                          variant="contained"
                          className="bg-[#009C49] md:min-w-[80px] max-w-[400px] focus:bg-[#009C49] hover:bg-[#5ee69d] z-0 my-[5px]"
                          onClick={() => {
                            const data: any = {
                              driver_id: driver_id,
                              bill_id: item.bill_id,
                            };

                            driverAcceptWork(data);
                            setStatePage("งานของคุณ");
                          }}
                        >
                          รับงาน
                        </Button>
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] px-[5px] flex items-center justify-center mb-[4px] ">
                        {item.bill_status}
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] font-[600] px-[5px] flex items-center text-center justify-center mb-[4px] ">
                        {item.restaurant_name}
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.last_price}
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.paymethod}
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] text-center flex flex-col items-center justify-center mb-[4px]">
                        <span>latitude :{item.user_latitude}</span>
                        <span>longitude :{item.user_longitude}</span>
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {regisDay}/{regisMonth}/{regisYear}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {statePage == "งานของคุณ" && (
        <div className="flex justify-center w-full md:max-w-[600px] m-auto">
          {haveOrder == true && (
            <div className="w-full bg-white rounded-xl">
              <header className="flex flex-col justify-center items-center w-full mt-[52px]">
                <p className="flex items-center justify-center">
                  วันที่ : {billDay} / {billMonth} / {billYear}
                </p>
                <p className="text-[20px] md:text-[24px] font-bold text-center my-[6px]">
                  {driverWorkList[0].restaurant_name}
                </p>
                <p className="text-[12px] flex items-center md:text-[14px]">
                  <LocationOnIcon className="text-[#da7929]" />
                  {driverWorkList[0].restaurant_latitude},
                  {driverWorkList[0].restaurant_longitude}
                </p>
              </header>

              <div className="flex flex-col items-center justify-center mt-[48px]">
                <FastfoodIcon className="text-[36px]" />
                <p className="w-full flex justify-center text-[18px] font-bold my-[12px]">
                  รายการอาหาร
                </p>
                <div className="w-[90%]">
                  {driverWorkList[0].menulist?.map((list) => (
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
                    {driverWorkList[0].total_price}
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">ค่าส่ง </span>
                    {driverWorkList[0].shipping_cost}
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">ส่วนลด </span>
                    {driverWorkList[0].discount}
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">รวมทั้งหมด </span>
                    {driverWorkList[0].last_price}
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">รูปแบบการจ่ายเงิน </span>
                    {driverWorkList[0].paymethod}
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">เบอร์โทรติดต่อ </span>
                    {driverWorkList[0].userPhone}
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">latitude : </span>
                    {driverWorkList[0].user_latitude}
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">longitude : </span>
                    {driverWorkList[0].user_longitude}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center my-[24px]">
                <header className="text-[18px] font-bold my-[32px]">
                  สถานะ
                </header>
                <div className="w-[90%] flex justify-between">
                  <div className="flex justify-end items-center w-[25%]">
                    <div
                      className={
                        "flex justify-center items-center w-[20px] h-[20px]  rounded-xl " +
                        firstStep
                      }
                    >
                      <MopedIcon className={"mt-[-40px] " + motor1} />
                    </div>
                    <div
                      className={
                        "w-[30%] md:w-[40%] rounded-l-xl  h-[10px] " +
                        secondStep
                      }
                    ></div>
                  </div>

                  <div className="flex justify-center items-center w-[25%]">
                    <div
                      className={"w-[50%] rounded-r-xl h-[10px] " + secondStep}
                    ></div>
                    <div
                      className={
                        "flex justify-center items-center w-[20px] h-[20px]  rounded-xl " +
                        secondStep
                      }
                    >
                      <MopedIcon className={"mt-[-40px] " + motor2} />
                    </div>
                    <div
                      className={"w-[50%] rounded-l-xl h-[10px] " + thirdStep}
                    ></div>
                  </div>
                  <div className="flex justify-center items-center w-[25%]">
                    <div
                      className={"w-[50%] rounded-r-xl h-[10px] " + thirdStep}
                    ></div>
                    <div
                      className={
                        "flex justify-center items-center w-[20px] h-[20px]  rounded-xl " +
                        thirdStep
                      }
                    >
                      <MopedIcon className={"mt-[-40px] " + motor3} />
                    </div>
                    <div
                      className={"w-[50%] rounded-l-xl h-[10px] " + fouthStep}
                    ></div>
                  </div>
                  <div className="flex justify-start items-center w-[25%]">
                    <div
                      className={
                        "w-[30%] md:w-[40%] rounded-r-xl h-[10px] " + fouthStep
                      }
                    ></div>
                    <div
                      className={
                        "flex justify-center items-center w-[20px] h-[20px]  rounded-xl " +
                        fouthStep
                      }
                    >
                      <MopedIcon className={"mt-[-40px] " + motor4} />
                    </div>
                  </div>
                </div>
                <div className="w-[90%] flex justify-between mt-[16px]">
                  <div className="flex justify-between items-start w-[25%]">
                    <span className="w-full font-bold flex justify-center items-center text-center text-[12px]">
                      รับคำสั่งซื้อ
                    </span>
                  </div>
                  <div className="flex justify-between w-[25%]">
                    <span className="w-full font-bold flex justify-center items-center text-center text-[12px]">
                      ถึงร้านอาหารแล้ว
                    </span>
                  </div>
                  <div className="flex justify-between w-[25%]">
                    <span className="w-full font-bold flex justify-center items-center text-center text-[12px]">
                      กำลังไปส่งอาหาร
                    </span>
                  </div>
                  <div className="flex justify-between w-[25%]">
                    <span className="w-full font-bold flex justify-center items-center text-center text-[12px]">
                      คำสั่งซื้อเสร็จสิ้น
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center">
                {endOrderState == false && (
                  <Button
                    variant="contained"
                    className="bg-[#009C49] md:min-w-[80px] max-w-[400px] focus:bg-[#009C49] hover:bg-[#009C49] z-0 my-[5px]"
                    onClick={() => {
                      let data;
                      if (
                        driverWorkList[0].bill_status == "Find Driver Success"
                      ) {
                        data = {
                          bill_id: driverWorkList[0].bill_id,
                          newBillStatus: "ถึงร้านอาหารแล้ว",
                        };
                      }
                      if (driverWorkList[0].bill_status == "ถึงร้านอาหารแล้ว") {
                        data = {
                          bill_id: driverWorkList[0].bill_id,
                          newBillStatus: "กำลังไปส่งอาหาร",
                        };
                      }
                      if (driverWorkList[0].bill_status == "กำลังไปส่งอาหาร") {
                        data = {
                          bill_id: driverWorkList[0].bill_id,
                          newBillStatus: "คำสั่งซื้อเสร็จสิ้น",
                        };
                      }
                      console.log(data);
                      updateBillStatus(data);
                    }}
                  >
                    เสร็จสิ้นขั้นตอนนี้?
                  </Button>
                )}
                {endOrderState == true && (
                  <Button
                    variant="contained"
                    className="bg-[#009C49] md:min-w-[80px] max-w-[400px] focus:bg-[#009C49] hover:bg-[#009C49] z-0 my-[5px]"
                    onClick={() => {
                      let data;

                      data = {
                        bill_id: driverWorkList[0].bill_id,
                        newBillStatus: "order success",
                      };
                      updateBillStatus(data);
                    }}
                  >
                    จบงาน
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DriverContainer;
