import { useEffect, useState } from "react";
import { NavbarDriver } from "./components/index";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
import axios from "axios";

import Login from "../Login-pages/Login";

const DriverHistory = () => {
  const getDriver: any = localStorage.getItem("user");
  if (!getDriver) {
    return <Login />;
  }
  const user_info = JSON.parse(getDriver);
  const driver_id = user_info.id;
  const sendDriver_id = { driver_id: driver_id };
  const [driverHistoryList, setDriverHistoryList] = useState([]);
  const getDriverHistoryList = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getdriverhistorylist`,
      data
    );

    if (response.data.success) {
      setDriverHistoryList(response.data.data);
    } else {
      console.log("ERROR");
    }
  };
  useEffect(() => {
    getDriverHistoryList(sendDriver_id);
  }, []);
  return (
    <div>
      <NavbarDriver />
      <header className="w-full flex justify-center my-[16px] text-[24px] font-bold">
        ประวัติการทำงาน
      </header>
      <div className="flex justify-center">
        <div className="bg-white w-[600px] h-[800px] overflow-scroll border-[1px] border-[#01B14F]">
          <div className="max-w-[800px]">
            <div className="w-full ">
              <div className=" w-full bg-slate-100 h-[80px] flex flex-nowrap items-center justify-items-center gap-1  ">
                <div className=" bg-[#009C49] text-[white] rounded-sm min-w-[100px] flex justify-center items-center h-[100%]">
                  วันที่บิล
                </div>
                <div className=" bg-[#009C49] text-[white] rounded-sm min-w-[100px] flex justify-center items-center h-[100%]">
                  ชื่อร้าน
                </div>
                <div className=" bg-[#009C49] text-[white] rounded-sm min-w-[100px] flex justify-center items-center h-[100%]">
                  ยอดรวม
                </div>
                <div className=" bg-[#009C49] text-[white] rounded-sm min-w-[100px] flex justify-center items-center h-[100%]">
                  รูปแบบ
                </div>
                <div className=" bg-[#009C49] text-[white] rounded-sm min-w-[100px] flex justify-center items-center h-[100%]">
                  ที่อยู่ลูกค้า
                </div>
                <div className=" bg-[#009C49] text-[white] rounded-sm min-w-[100px] flex justify-center items-center h-[100%]">
                  เบอร์โทร
                </div>
              </div>
            </div>

            {driverHistoryList?.map((item: any) => {
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
                    {regisDay}/{regisMonth}/{regisYear}
                  </div>
                  <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] px-[5px] flex items-center justify-center mb-[4px] text-center font-bold">
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
                    {item.userPhone}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverHistory;
