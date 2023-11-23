import React, { useEffect, useState } from "react";
import { Navbarauth } from "../Home/components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useToken } from "../../util/token/token";
import { Button } from "@mui/material";

import axios from "axios";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
const ConfirmPage = ({ clearToken, saveLocation }) => {
  const [couponList, setCouponList] = useState([]);
  const [promotion_id, setPromotion_id] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [paymethod, setPaymethod] = useState("เงินสด");
  const [notetoDriver, setNoteToDriver] = useState("");
  const cart: any = localStorage.getItem("cart");
  const [storeLocation, setStoreLocation] = useState({});
  const { createCarttoLocalStorage } = useToken();
  let user_cart = JSON.parse(cart);
  const restaurant_id = { restaurant_id: user_cart[0].restaurant_id };
  let totalprice = 0;
  let deliveryCost = 0;
  let lastprice = 0;
  for (let i = 0; i < user_cart.length; i++) {
    totalprice += Number(user_cart[i].menu_totalprice);
  }
  const getLoaction = localStorage.getItem("location");
  let user_location = JSON.parse(getLoaction);
  const getOwner = localStorage.getItem("user");
  const user_info = JSON.parse(getOwner);
  const user_id = user_info.id;
  console.log(user_id);

  const handleChange = (event: any) => {
    setPaymethod(event.target.value);
    console.log(paymethod);
  };
  const getUserlocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      saveLocation(location);
    });
  };
  const getStoreAddres = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getstoreaddress`,
      data
    );
    if (response.data.success) {
      setStoreLocation(response.data.data);
      console.log(storeLocation);

      console.log(response.data.data, "address");
      console.log("Update already");
    } else {
      console.log("Error");
    }
  };
  const getCouponList = async () => {
    const response = await axios.get(`${GROBFOOD_USER_URL}/getcouponlist`);
    if (response.data.success) {
      setCouponList(response.data.data);
      console.log("get COUPON already");
    } else {
      console.log("Error");
    }
  };
  const createBillAndCart = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/addcartandbill`,
      data
    );
    if (response.data.success) {
      console.log("create already");
    } else {
      console.log("Error");
    }
  };
  function getDistanceBetweenPointsNew(
    latitude1,
    longitude1,
    latitude2,
    longitude2,
    unit = "kilometers"
  ) {
    const theta = longitude1 - longitude2;
    let distance =
      Math.sin(deg2rad(latitude1)) * Math.sin(deg2rad(latitude2)) +
      Math.cos(deg2rad(latitude1)) *
        Math.cos(deg2rad(latitude2)) *
        Math.cos(deg2rad(theta));
    distance = Math.acos(distance);
    distance = rad2deg(distance);
    distance = distance * 60 * 1.1515;
    if (unit === "kilometers") {
      distance *= 1.609344;
    }
    return distance.toFixed(1);
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  function rad2deg(rad) {
    return rad * (180 / Math.PI);
  }

  useEffect(() => {
    getStoreAddres(restaurant_id);
    getCouponList();
  }, []);
  console.log(couponList);

  if (storeLocation.length != null && user_location != null) {
    console.log(user_location);
    let distance;
    distance = getDistanceBetweenPointsNew(
      storeLocation[0].latitude,
      storeLocation[0].longitude,
      user_location.latitude,
      user_location.longitude
    );
    deliveryCost = distance * 10;
  }
  lastprice = totalprice + deliveryCost;
  return (
    <div className=" bg-slate-100 flex flex-col items-center">
      <Navbarauth clearToken={clearToken} />
      <div className="bg-white w-full pb-[20px]">
        <div className="mt-[70px] md:mt-[100px] text-[24px] md:text-[36px]  font-[600] px-[20px] md:px-[120px] lg:px-[240px] xl:px-[25%]">
          ขั้นตอนสุดท้าย - เช็คเอ้าท์
        </div>
        <span className="text-[18px] md:text-[24px] font-[500] px-[20px] md:px-[120px] lg:px-[240px] xl:px-[25%]">
          {user_cart[0].restaurant_name}
        </span>
      </div>
      <div className="h-[auto] mt-[20px] max-w-[700px] md:w-[50%] bg-white rounded-md w-[95%]">
        <div className="border-b-[1px] py-[16px]">
          <span className="text-[24px] font-[500] px-[5%]">ที่อยู่</span>
        </div>
        <div className="mt-[20px] flex justify-center items-center w-full ">
          <div className="mb-[12px] flex px-[10px] w-[80%]">
            <span className=" mr-[14px] flex justify-center items-center">
              <FmdGoodIcon className="text-[32px] text-[#ac3131]" />
            </span>

            <input
              type="text"
              className=" w-full h-[48px] border border-[#c5c5c5] outline-0 focus:border-[#1ebd60] rounded-[4px] px-[24px] py-[6px] text-[14px] text-[#7a7a7a]"
              placeholder="ระบุตำแหน่งของคุณ"
              value={getLoaction ? getLoaction : ""}
            />
            <span className="ml-[14px] flex justify-center items-center">
              <MyLocationIcon
                className="text-[24px] text-[#ff9457]"
                onClick={() => {
                  getUserlocation();
                }}
              />
            </span>
          </div>
        </div>
        <div className="w-full flex justify-center my-[16px]">
          <div className="w-[80%]">
            <div className="mb-[12px] text-[#7a7a7a]">รายละเอียดที่อยู่</div>
            <input
              type="text"
              className=" w-full h-[48px] border border-[#c5c5c5] outline-0 focus:border-[#1ebd60] rounded-[4px] px-[24px] py-[6px] text-[14px] text-[#7a7a7a]"
              placeholder="เช่น ชั้น หมายเลขอาคาร"
              onChange={(e) => {
                setAddressDetail(e.target.value);
              }}
            />
            <div className="mb-[12px] text-[#7a7a7a] my-[12px]">
              หมายเหตุถึงคนขับ
            </div>
            <input
              type="text"
              className=" w-full h-[48px] border border-[#c5c5c5] outline-0 focus:border-[#1ebd60] rounded-[4px] px-[24px] py-[6px] text-[14px] text-[#7a7a7a]"
              placeholder="เช่น เจอกันที่ล็อบบี้"
              onChange={(e) => {
                setNoteToDriver(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="h-[auto] mt-[20px] max-w-[700px] md:w-[50%] bg-white rounded-md w-[95%]">
        <div className="border-b-[1px] py-[16px]">
          <span className="text-[24px] font-[500] px-[5%]">สรุปคำสั่งซื้อ</span>
        </div>
        <div className="flex flex-col  mt-[20px] max-w-[700px] bg-white px-[20px] mb-[16px]">
          {user_cart.map((item) => {
            return (
              <div className="" key={item.menu_id}>
                <div className="flex min-h-[80px] border-b-[1px] py-[10px]">
                  <div className="w-[20%] flex justify-center items-center">
                    <RemoveIcon className="text-[16px] md:text-[24px] text-[#00A5CF]" />
                    <span className="mx-[5px] md:mx-[10px]">{item.amount}</span>
                    <AddIcon
                      className="text-[16px] md:text-[24px] text-[#00A5CF]"
                      onClick={() => {
                        let result = user_cart.find(
                          //เช็คหาดูว่ามีสินค้านี้อยู่ในตะกร้าอยู่แล้วหรือไม่
                          (list) => {
                            return list.menu_id == item.menu_id;
                          }
                        );
                        if (result != undefined) {
                          item.amount++;
                          item.menu_totalprice =
                            Number(item.menu_price) * Number(item.amount);

                          let newCart = user_cart;

                          window.localStorage.removeItem("cart");
                          createCarttoLocalStorage(newCart);
                        }
                        console.log(user_cart);
                      }}
                    />
                  </div>
                  <div className="hidden md:flex">
                    <img
                      className="p-[10px] max-w-[130px] max-h-[130px] bg-cover"
                      src={`data:image/png;base64,${item.menu_image_url}`}
                      alt="menu-image"
                    />
                  </div>

                  <div className="flex-1 px-[10px] md:px-[20px] font-[500]">
                    {item.menu_name}
                  </div>
                  <div className="w-[20%] flex justify-center">
                    {item.menu_totalprice}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="my-[40px] px-[20px]">
          <div className="flex justify-between">
            <span>รวมค่าอาหาร</span> <span>฿{totalprice}</span>
          </div>
          <div className="flex justify-between">
            <span>ค่าส่ง</span>
            <span>{deliveryCost}</span>
          </div>
        </div>
      </div>
      <div className="h-[auto] mt-[20px] max-w-[700px] md:w-[50%] bg-white rounded-md w-[95%]">
        <div className="border-b-[1px] py-[16px]">
          <span className="text-[24px] font-[500] px-[5%]">
            รายการคูปองส่วนลด
          </span>
        </div>
        <div className="flex flex-col justify-center content-center items-center w-[full] mt-[30px] mb-[20px]">
          <label className="w-[90%] mb-[16px]">เลือกใช้</label>
          {/* <select
            id="paymethod"
            className="border-[2px] p-[10px] rounded-lg w-[90%]"
            onChange={handleChange}
            defaultValue={"เงินสด"}
          >
            {couponList?.map((item) => {
              return <option value="เงินสด">{item.coupon_name}</option>;
            })}
          </select> */}
          <div className="flex flex-row flex-wrap p-[24px] justify-center">
            {couponList?.map((item) => {
              let type = "บาท";
              if (item.discount_type == "percent") {
                type = "%";
              } else {
                type = "บาท";
              }
              return (
                <div className="flex flex-row w-[200px] h-[70px] shadow-sm border-[1px] rounded-md mx-[16px] my-[8px]">
                  <div className="flex justify-center flex-col w-full">
                    <div className="bg-[white] text-black flex text-[18px] font-bold justify-center">
                      {item.coupon_name}
                    </div>
                    <div className="bg-[white] text-black flex justify-center text-[14px]">
                      ส่วนลด {item.discount_value} {type}
                    </div>
                  </div>
                  <div className="bg-[green] w-[70px] flex justify-center items-center text-[white] text-[16px] rounded-r-md">
                    ใช้
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="h-[auto] mt-[20px] max-w-[700px] md:w-[50%] bg-white rounded-md w-[95%] mb-[150px]">
        <div className="border-b-[1px] py-[16px]">
          <span className="text-[24px] font-[500] px-[5%]">
            รายละเอียดการชำระเงิน
          </span>
        </div>
        <div className="flex flex-col justify-center content-center items-center w-[full] mt-[30px] mb-[20px]">
          <label className="w-[90%] mb-[16px]">วิธีชำระเงิน</label>
          <select
            id="paymethod"
            className="border-[2px] p-[10px] rounded-lg w-[90%]"
            onChange={handleChange}
            defaultValue={"เงินสด"}
          >
            <option value="เงินสด">เงินสด</option>
            <option value="โอนจ่าย">โอนจ่าย</option>
          </select>
        </div>
      </div>
      <div className="fixed bottom-0 flex justify-center w-full min-h-[100px] items-center bg-white">
        <div className="flex justify-between items-center my-[20px] max-w-[700px] md:w-[50%] bg-white rounded-md w-[95%]">
          <div>
            <div className="text-[18px] font-[300]">รวมทั้งหมด</div>
            <div className="text-[24px] font-[500]">฿{lastprice}</div>
          </div>
          <Button
            variant="contained"
            className="bg-[#01B14F] w-full h-[48px] rounded-md focus:bg-[#01B14F] hover:bg-[#01B14F] max-w-[200px]"
            onClick={() => {
              if (user_location != null) {
                let restaurant_id = user_cart[0].restaurant_id;
                let user_latitude = user_location.latitude;
                let user_longitude = user_location.longitude;
                const data = [
                  {
                    totalprice,
                    lastprice,
                    user_id,
                    promotion_id,
                    restaurant_id,
                    paymethod,
                    deliveryCost,
                    user_latitude,
                    user_longitude,
                    notetoDriver,
                    addressDetail,
                  },
                  user_cart,
                ];
                createBillAndCart(data);
              } else {
                console.log("NEED LOCATION");
              }
            }}
          >
            ยืนยันรายการสั่งซื้อ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
