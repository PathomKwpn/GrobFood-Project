import React, { useEffect, useState } from "react";
import { NavbarAdmin } from "./component/index";
import LoginAdmin from "./LoginAdmin";
import { useToken } from "../../util/token/token";
import { Button } from "@mui/material";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
import axios from "axios";
const AdminPage = () => {
  const [storeList, setStoreList] = useState();
  const [viewState, setViewState] = useState<"store" | "coupon">("store");
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
  const getStoreList = async () => {
    const response = await axios.get(`${GROBFOOD_USER_URL}/getstorelist`);
    if (response.data.success) {
      console.log(response.data);
      setStoreList(response.data.data);
    } else {
      console.log("err");
    }
  };
  useEffect(() => {
    getStoreList();
  }, []);
  return (
    <div className=" bg-slate-100 w-full min-h-[100vh] h-[auto]">
      <NavbarAdmin />
      <div className="flex flex-row justify-around my-[24px] mb-[30px] w-[80%] m-auto">
        <Button
          variant="contained"
          onClick={() => {
            setViewState("store");
            updateToken();
          }}
          className="bg-[#01B14F] min-w-[150px] md:min-w-[200px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F]"
        >
          รายการร้านค้า
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setViewState("coupon");
            updateToken();
          }}
          className="bg-[#01B14F] min-w-[150px] md:min-w-[200px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F]"
        >
          รายการคูปองส่วนลด
        </Button>
      </div>
      {viewState == "store" && (
        <div className="h-[auto] max-w-[800px] flex flex-col justify-center m-[auto] p-[16px] rounded-xl shadow-md bg-white">
          <div className="text-[24px] font-bold flex justify-center my-[30px]">
            รายการร้านค้า
          </div>
          <div className="flex justify-center">
            <div className="bg-white w-[600px] h-[800px] overflow-scroll border-2 border-black">
              <div className="max-w-[800px]">
                <div className="w-full ">
                  <div className=" bg-slate-100 h-[80px] flex flex-nowrap items-center justify-items-center gap-1  ">
                    <div className=" bg-white  min-w-[100px] flex justify-center items-center h-[100%]">
                      รูปอาหาร
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      ชื่ออาหาร
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      ชื่ออาหาร
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center  h-[100%]">
                      ชื่ออาหาร
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      ราคา
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      ประเภทอาหาร
                    </div>
                  </div>
                </div>
                {storeList?.map((item) => {
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
                        {item.restaurant_catagory}
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.restaurant_catagory}
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
