import React, { useEffect, useState } from "react";
import { NavbarAdmin } from "./component/index";
import LoginAdmin from "./LoginAdmin";
import { useToken } from "../../util/token/token";
import { Button } from "@mui/material";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
import axios from "axios";
const AdminPage = () => {
  const {
    saveTokentoLocalStorage,
    saveUsertoLacalStorage,
    createCarttoLocalStorage,
    updateToken,
  } = useToken();
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    console.log("NO USER");

    return (
      <LoginAdmin
        setUser={saveUsertoLacalStorage}
        setToken={saveTokentoLocalStorage}
        createCart={createCarttoLocalStorage}
      />
    );
  }
  const [dateTimestamp, setDateTimestamp] = useState(+new Date());
  const [viewState, setViewState] = useState<"store" | "coupon">("store");
  const [storeList, setStoreList] = useState([]);
  const [couponList, setCouponList] = useState([]);
  console.log(dateTimestamp, "DATETIME");

  const getStoreList = async () => {
    const response = await axios.get(`${GROBFOOD_USER_URL}/getstorelist`);
    if (response.data.success) {
      console.log(response.data);
      setStoreList(response.data.data);
    } else {
      console.log("err");
    }
  };
  const getCouponList = async () => {
    const response = await axios.get(`${GROBFOOD_USER_URL}/getcouponlist`);
    if (response.data.success) {
      let data = response.data.data;
      for (let i = 0; i < data.length; i++) {
        data[i].expire_timestamp = +new Date(data[i].expire_date);
        console.log("forloop");
      }
      console.log(data);
      setCouponList(data);
    } else {
      console.log("err");
    }
  };
  const deleteStore = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/deletestore`, data);
    if (response.data.success) {
      console.log(response.data);
      getStoreList();
    } else {
      console.log("err");
    }
  };
  useEffect(() => {
    getStoreList();
    getCouponList();
  }, []);
  return (
    <div className=" bg-[#01B14F] w-full min-h-[100vh] h-[auto]">
      <NavbarAdmin />
      <div className="flex flex-row justify-center my-[24px] mb-[30px] w-[80%] m-auto">
        <Button
          variant="contained"
          onClick={() => {
            setViewState("store");
            updateToken();
          }}
          className="bg-[white] min-w-[150px] md:min-w-[200px] max-w-[400px] focus:bg-[white] hover:bg-[white] text-[black] mx-[16px]"
        >
          รายการร้านค้า
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setViewState("coupon");
            updateToken();
          }}
          className="bg-[white] min-w-[150px] md:min-w-[200px] max-w-[400px] focus:bg-[white] hover:bg-[white] text-[black] mx-[16px]"
        >
          รายการคูปองส่วนลด
        </Button>
      </div>
      {viewState == "store" && (
        <div className="h-[auto] max-w-[800px] flex flex-col justify-center m-[auto] p-[16px] rounded-xl shadow-md bg-white">
          <div className="text-[24px] font-bold flex justify-center my-[30px] bg-[#01B14F] max-w-[500px] m-[auto] p-[12px] px-[24px] rounded-lg text-[white]">
            รายการร้านค้า
          </div>
          <div className="flex justify-center">
            <div className="bg-white w-[600px] h-[800px] overflow-scroll border-[1px] border-[#01B14F]">
              <div className="max-w-[800px]">
                <div className="w-full ">
                  <div className=" w-full bg-slate-100 h-[80px] flex flex-nowrap items-center justify-items-center gap-1  ">
                    <div className=" bg-white  min-w-[100px] flex justify-center items-center h-[100%]">
                      ชื่อร้าน
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      ประเภทอาหาร
                    </div>

                    <div className=" bg-white min-w-[100px] flex justify-center items-center  h-[100%]">
                      คะแนนร้าน
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      เวลาเปิด-ปิด
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      วันที่สร้างร้าน
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]"></div>
                  </div>
                </div>

                {storeList?.map((item: any) => {
                  return (
                    <div
                      className=" flex flex-nowrap items-center justify-items-center gap-1 "
                      key={item.restaurant_id}
                    >
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] px-[5px] flex items-center justify-center mb-[4px] ">
                        {item.restaurant_name}
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.restaurant_catagory}
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.score}
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex flex-col items-center justify-center mb-[4px]">
                        <span>เปิด :{item.open_time}</span>
                        <span>ปิด :{item.close_time}</span>
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.regis_date}
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex flex-col items-center justify-center mb-[4px] overflow-hidden">
                        <Button
                          variant="contained"
                          className="bg-[#c43232] md:min-w-[80px] max-w-[400px] focus:bg-[red] hover:bg-[#d14f4f] z-0 my-[5px]"
                          onClick={() => {
                            const owner_id: any = {
                              owner_id: item.owner_id,
                            };
                            deleteStore(owner_id);
                          }}
                        >
                          ลบ
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {viewState == "coupon" && (
        <div className="h-[auto] max-w-[800px] flex flex-col justify-center m-[auto] p-[16px] rounded-xl shadow-md bg-white">
          <div className="text-[24px] font-bold flex justify-center my-[30px]">
            รายการคูปองส่วนลด
          </div>
          <div className="flex justify-center">
            <div className="bg-white w-[600px] h-[800px] overflow-scroll border-2 border-black">
              <div className="max-w-[800px]">
                <div className="w-full ">
                  <div className=" bg-slate-100 h-[80px] flex flex-nowrap items-center justify-items-center gap-1  ">
                    <div className=" bg-white  min-w-[100px] flex justify-center items-center h-[100%]">
                      ชื่อคูปอง
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      เริ่มใช้
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      หมดอายุ
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center  h-[100%]">
                      ส่วนลด
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      รูปแบบ
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      ขั้นต่ำ
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      ลดสูงสุด
                    </div>
                  </div>
                </div>
                {couponList?.map((item: any) => {
                  let newDate = new Date();
                  let time = item.start_date;
                  console.log(time);
                  console.log(newDate);
                  let aga = time - newDate;
                  console.log(aga);

                  return (
                    <div
                      className=" flex flex-nowrap items-center justify-items-center gap-1 "
                      key={item.coupon_id}
                    >
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] px-[5px] flex items-center justify-center mb-[4px] ">
                        {item.coupon_name}
                      </div>
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.start_date}
                      </div>
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.expire_date}
                      </div>
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.discount_value}
                      </div>
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] flex flex-col items-center justify-center mb-[4px]">
                        {item.discount_type}
                      </div>
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.min_totalprice}
                      </div>
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.max_discount}
                      </div>
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] flex flex-col items-center justify-center mb-[4px] overflow-hidden">
                        <Button
                          variant="contained"
                          className="bg-[#c43232] md:min-w-[80px] max-w-[400px] focus:bg-[red] hover:bg-[#d14f4f] z-0 my-[5px]"
                          onClick={() => {
                            // const data = {
                            //   menu_image_id: item.menu_image_id,
                            //   menu_id: item.menu_id,
                            // };
                          }}
                        >
                          ลบ
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
