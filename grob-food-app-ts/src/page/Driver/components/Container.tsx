// import axios from "axios";
// import React, { useEffect } from "react";
// import { GROBFOOD_USER_URL } from "../../../util/constants/constant";
import { Button } from "@mui/material";
import { useState } from "react";
import { useToken } from "../../../util/token/token";
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
  restaurant_name: string;
  restaurant_latitude: string;
  restaurant_longitude: string;
}
type DriverContainerProps = {
  orderList: Array<orderListProps>;
  driverWorkList: Array<driverWorkListProps>;
  driverAcceptWork: any;
  driver_id: string;
  //   setNoteToDriver: React.Dispatch<React.SetStateAction<string>>;
};
const DriverContainer = ({
  orderList,
  driverWorkList,
  driverAcceptWork,
  driver_id,
}: DriverContainerProps) => {
  const { updateToken } = useToken();
  const [statePage, setStatePage] = useState("รายการงาน");
  const [menuOrderList, setMenuOrderList] = useState(
    driverWorkList[0].menulist
  );
  console.log(menuOrderList);

  console.log(driverWorkList);
  let billDay;
  let billMonth;
  let billYear;
  if (driverWorkList.length != 0) {
    let createDate = new Date(driverWorkList[0].bill_date);
    billDay = createDate.getDate();
    billMonth = createDate.getMonth();
    billYear = createDate.getFullYear();
    console.log(driverWorkList[0].menulist[0].menu_name);
  }

  return (
    <div className="px-[5px]">
      <Button
        variant="contained"
        className="bg-[#c43232] md:min-w-[80px] max-w-[400px] focus:bg-[red] hover:bg-[#d14f4f] z-0 my-[5px]"
        onClick={() => {
          setStatePage("รายการงาน");
          updateToken();
        }}
      >
        รายการงาน
      </Button>
      <Button
        variant="contained"
        className="bg-[#c43232] md:min-w-[80px] max-w-[400px] focus:bg-[red] hover:bg-[#d14f4f] z-0 my-[5px]"
        onClick={() => {
          setStatePage("งานของคุณ");
          updateToken();
        }}
      >
        งานของคุณ
      </Button>
      <header className="text-[32px] font-bold flex justify-center my-[24px]">
        {statePage}
      </header>
      {statePage == "รายการงาน" && (
        <div className="flex justify-center">
          <div className="bg-white w-[600px] h-[800px] overflow-scroll border-[1px] border-[#01B14F]">
            <div className="max-w-[800px]">
              <div className="w-full ">
                <div className=" w-full bg-slate-100 h-[80px] flex flex-nowrap items-center justify-items-center gap-1  ">
                  <div className=" bg-white  min-w-[100px] flex justify-center items-center h-[100%]">
                    รับงาน
                  </div>
                  <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                    สถานะงาน
                  </div>

                  <div className=" bg-white min-w-[100px] flex justify-center items-center  h-[100%]">
                    ยอดรวม
                  </div>
                  <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                    รูปแบบ
                  </div>
                  <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                    ที่อยู่ลูกค้า
                  </div>
                  <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                    วันที่
                  </div>
                </div>
              </div>

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
                        className="bg-[#c43232] md:min-w-[80px] max-w-[400px] focus:bg-[red] hover:bg-[#d14f4f] z-0 my-[5px]"
                        onClick={() => {
                          const data: any = {
                            driver_id: driver_id,
                            bill_id: item.bill_id,
                          };
                          console.log(data);

                          driverAcceptWork(data);
                        }}
                      >
                        รับงาน
                      </Button>
                    </div>
                    <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] px-[5px] flex items-center justify-center mb-[4px] ">
                      {item.bill_status}
                    </div>
                    <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                      {item.last_price}
                    </div>
                    <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                      {item.paymethod}
                    </div>
                    <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex flex-col items-center justify-center mb-[4px]">
                      <span>เปิด :{item.user_latitude}</span>
                      <span>ปิด :{item.user_longitude}</span>
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
      )}
      {statePage == "งานของคุณ" && (
        <div className="flex justify-center">
          <div className="w-[800px] bg-slate-200">
            <header>
              <p>
                {billDay} / {billMonth} / {billYear}
              </p>
              <p>{driverWorkList[0].restaurant_name}</p>
              <p>
                {driverWorkList[0].restaurant_latitude},
                {driverWorkList[0].restaurant_longitude}
              </p>
            </header>

            <div>
              <p>รายการอาหาร</p>
              {menuOrderList.map((list) => (
                <div className="user">
                  {list.amount}x{list.menu_name}
                  {list.price}
                </div>
              ))}
            </div>

            <div>
              <header>สรุปคำสั่งซื้อ</header>
              <div>
                <div>รวมค่าอาหา {driverWorkList[0].total_price}</div>
                <div>ค่าส่ง {driverWorkList[0].shipping_cost}</div>
                <div>ส่วนลด {driverWorkList[0].discount}</div>
                <div>รวมทั้งหมด {driverWorkList[0].last_price}</div>
                <div>รูปแบบการจ่ายเงิน {driverWorkList[0].paymethod}</div>
              </div>
            </div>
          </div>
          {/* <div className="bg-white w-[600px] h-[800px] overflow-scroll border-[1px] border-[#01B14F]">
            <div className="max-w-[800px]">
              <div className="w-full ">
                <div className=" w-full bg-slate-100 h-[80px] flex flex-nowrap items-center justify-items-center gap-1  ">
                  <div className=" bg-white  min-w-[100px] flex justify-center items-center h-[100%]">
                    รับงาน
                  </div>
                  <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                    สถานะงาน
                  </div>

                  <div className=" bg-white min-w-[100px] flex justify-center items-center  h-[100%]">
                    ยอดรวม
                  </div>
                  <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                    รูปแบบ
                  </div>
                  <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                    ที่อยู่ลูกค้า
                  </div>
                  <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                    วันที่
                  </div>
                </div>
              </div>

              {driverWorkList?.map((item: any) => {
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
                        className="bg-[#c43232] md:min-w-[80px] max-w-[400px] focus:bg-[red] hover:bg-[#d14f4f] z-0 my-[5px]"
                        onClick={() => {
                          const data: any = {
                            driver_id: driver_id,
                            bill_id: item.bill_id,
                          };
                          console.log(data);

                          driverAcceptWork(data);
                        }}
                      >
                        รับงาน
                      </Button>
                    </div>
                    <div className=" min-w-[100px] max-w-[100px] h-[100px] bg-slate-200 text-[12px] text-center flex items-center justify-center mb-[4px]">
                      {item.bill_status}
                    </div>
                    <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                      {item.last_price}
                    </div>
                    <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                      {item.paymethod}
                    </div>
                    <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex flex-col items-center justify-center mb-[4px]">
                      <span>เปิด :{item.user_latitude}</span>
                      <span>ปิด :{item.user_longitude}</span>
                    </div>
                    <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                      {regisDay}/{regisMonth}/{regisYear}
                    </div>
                    
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default DriverContainer;
