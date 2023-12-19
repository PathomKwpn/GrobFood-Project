import { useEffect, useState } from "react";
import { Navbarauth } from "../Home/components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import FmdGoodIcon from "@mui/icons-material/FmdGood";
// import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useToken } from "../../util/token/token";
import { Button } from "@mui/material";

import axios from "axios";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
import Login from "../Login-pages/Login";
// import Cart from "../Cart/Cart";

import Location from "./components/Location";
import { useNavigate } from "react-router-dom";
type ConfirmPageProps = {
  saveLocation: any;
};

interface storeLocation {
  latitude: any;
  longitude: any;
}
const ConfirmPage = ({ saveLocation }: ConfirmPageProps) => {
  const nevigate = useNavigate();
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  const [noLocationPopup, setNoLocationPopup] = useState<"open" | "close">(
    "close"
  );
  // const [ConfirmBillState, setConfirmBillState] = useState<
  //   "pass" | "cancel" | "none"
  // >("none");
  //COUPON
  const [couponList, setCouponList] = useState([]);
  const [couponSelected, setCouponSelected] = useState<boolean>(false);
  const [coupon_id, setCoupon_id] = useState<string>("");
  const [coupon_name, setCouponName] = useState<string>("");
  const [discount_value, setDiscountValue] = useState<string>("");
  const [discount_value_type, setDiscountValueType] = useState<string>("");
  const [min_totalprice, setMin_totalprice] = useState<string>("");
  const [distcount_type, setDiscountType] = useState<string>("");
  //BILL_DETAIL
  const [addressDetail, setAddressDetail] = useState("");
  const [paymethod, setPaymethod] = useState("เงินสด");
  const [notetoDriver, setNoteToDriver] = useState("");
  const cart: any = localStorage.getItem("cart");
  const [storeLocation, setStoreLocation] = useState<Array<storeLocation>>([]);
  const { createCarttoLocalStorage, clearCart } = useToken();
  let user_cart = JSON.parse(cart);

  let restaurant_id: any;
  if (user_cart.length != 0) {
    restaurant_id = { restaurant_id: user_cart[0].restaurant_id };
  }
  let totalprice = 0;
  let deliveryCost = 0;
  let lastprice = 0;
  for (let i = 0; i < user_cart.length; i++) {
    totalprice += Number(user_cart[i].menu_totalprice);
  }
  const getLoaction: any = localStorage.getItem("location");
  let user_location = JSON.parse(getLoaction);
  const user_info = JSON.parse(getOwner);
  const user_id = user_info.id;
  console.log(couponList);

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
      console.log(response.data.data);

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
  const addBill = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/addbill`, data);
    if (response.data.success) {
      console.log("create already");

      nevigate("/deliverypage");
    } else {
      console.log("Error");
      alert("คุณมีคำสั่งซื้อที่กำลังดำเนินการอยู่");
    }
  };
  console.log(storeLocation);

  function getDistanceBetweenPointsNew(
    latitude1: any,
    longitude1: number,
    latitude2: any,
    longitude2: number,
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
  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
  function rad2deg(rad: number) {
    return rad * (180 / Math.PI);
  }

  useEffect(() => {
    getStoreAddres(restaurant_id);
    getCouponList();
  }, []);
  console.log(couponList);
  console.log(storeLocation);

  if (storeLocation.length != 0 && user_location != null) {
    console.log(user_location);
    let distance;
    distance = getDistanceBetweenPointsNew(
      storeLocation[0].latitude,
      storeLocation[0].longitude,
      user_location.latitude,
      user_location.longitude
    );
    deliveryCost = Number(distance) * 10;
  } else {
    deliveryCost = 0;
  }
  let discount = 0;
  if (couponSelected == false) {
    lastprice = totalprice + deliveryCost;
  } else {
    if (distcount_type == "percent") {
      discount = (totalprice * Number(discount_value)) / 100;
      if (discount > 100) {
        discount = 100;
      }
      lastprice = totalprice - discount + deliveryCost;
    } else {
      discount = Number(discount_value);
      lastprice = totalprice - discount + deliveryCost;
    }
  }

  return (
    <div className=" bg-slate-100 flex flex-col items-center justify-center">
      <Navbarauth />
      {user_cart.length != 0 && (
        <div className=" flex flex-col items-center justify-center w-full">
          <div className="bg-white w-full pb-[20px] max-w-[700px]">
            <div className="mt-[70px] md:mt-[100px] text-[24px] md:text-[36px]  font-[600] px-[20px] md:px-[120px] lg:px-[240px] xl:px-[10%]">
              ขั้นตอนสุดท้าย - เช็คเอ้าท์
            </div>
            <span className="text-[18px] md:text-[24px] font-[500] px-[20px] md:px-[120px] lg:px-[240px] xl:px-[10%] flex">
              {user_cart[0].restaurant_name}
            </span>
          </div>

          <Location
            setNoteToDriver={setNoteToDriver}
            setAddressDetail={setAddressDetail}
            getUserlocation={getUserlocation}
            noLocationPopup={noLocationPopup}
          />

          <div className="h-[auto] mt-[20px] max-w-[700px] bg-white rounded-md w-[95%]">
            <div className="border-b-[1px] py-[16px]">
              <span className="text-[24px] font-[500] px-[5%]">
                รายการคูปองส่วนลด
              </span>
            </div>
            <div className="flex flex-col justify-center content-center items-center w-[full] mt-[30px] mb-[20px]">
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
                {couponList?.map(
                  (item: {
                    coupon_id: string;
                    coupon_name: string;
                    create_date: string;
                    discount_type: string;
                    discount_value: string;
                    expire_date: string;
                    max_discount: string;
                    min_totalprice: string;
                    start_date: string;
                    status: null | string;
                  }) => {
                    let type = "บาท";
                    if (item.discount_type == "percent") {
                      type = "%";
                    } else {
                      type = "บาท";
                    }
                    return (
                      <div className="flex flex-row w-[200px] h-[70px] shadow-md rounded-md mx-[16px] my-[8px]">
                        <div className="flex bg-[#01B14F] justify-center flex-col rounded-md w-full border-[1px] border-[green]">
                          <div className="bg-[#01B14F] text-white flex text-[18px] rounded-md font-bold justify-center">
                            {item.coupon_name}
                          </div>
                          <div className="bg-white">
                            <div className="bg-[white] text-black flex justify-center text-[14px] font-[500]">
                              ส่วนลด {item.discount_value} {type}
                            </div>
                            <div className="bg-[white] text-[#b4b4b4] flex justify-center text-[10px]">
                              ขั้นต่ำ {item.min_totalprice} บาท
                            </div>
                          </div>
                        </div>
                        <div
                          className="bg-[#01B14F] w-[70px] flex justify-center items-center text-[white] font-[500] text-[16px] rounded-md"
                          onClick={() => {
                            let startTimestamp = +new Date(item.start_date);
                            let expireTimestamp = +new Date(item.expire_date);
                            // console.log(expireTimestamp, "EXPIRE");
                            let nowTimestamp = +new Date();
                            // console.log(nowTimestamp, "NOW");
                            if (
                              nowTimestamp > expireTimestamp ||
                              nowTimestamp < startTimestamp
                            ) {
                              alert("ไม่อยู่ในระยะเวลาใช้งานคูปอง");
                              console.log("ไม่อยู่ในระยะเวลาใช้งานคูปอง");
                            } else {
                              setCouponName(item.coupon_name);
                              setDiscountValue(item.discount_value);
                              setDiscountType(item.discount_type);
                              setMin_totalprice(item.min_totalprice);
                              setDiscountValueType(type);
                              setCoupon_id(item.coupon_id);
                              setCouponSelected(true);
                            }
                          }}
                        >
                          ใช้
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              <label className="w-[90%] mb-[16px] bg-slate-0 shadow-sm rounded-md border-2 flex flex-col justify-center items-center">
                <div className="w-full flex justify-center items-center my-[10px] text-[18px] font-[500]">
                  คูปองที่คุณเลือกใช้
                </div>
                {couponSelected == false && (
                  <div className="flex flex-row  h-[70px] shadow-md rounded-md mx-[16px] my-[16px] max-w-[240px]">
                    <div className="flex bg-[#01B14F] justify-center flex-col w-full border-[1px] border-[green]">
                      <div className="bg-[#01B14F] px-[16px] text-white flex text-[18px] font-bold justify-center">
                        ไม่ได้เลือก
                      </div>
                    </div>
                    <div className="bg-[#01B14F] w-[70px] flex justify-center items-center text-[white] text-[16px] rounded-md"></div>
                  </div>
                )}
                {couponSelected == true && (
                  <div className="flex flex-row  h-[70px] shadow-md rounded-md mx-[16px] my-[16px] max-w-[240px]">
                    <div className="flex bg-[#01B14F] justify-center flex-col rounded-md w-full border-[1px] border-[green]">
                      <div className="bg-[#01B14F] text-white flex text-[18px] rounded-md font-bold justify-center">
                        {coupon_name}
                      </div>
                      <div className="bg-white">
                        <div className="bg-[white] text-black flex justify-center text-[14px]">
                          ส่วนลด {discount_value} {discount_value_type}
                        </div>
                        <div className="bg-[white] text-[#b4b4b4] flex justify-center text-[10px]">
                          ขั้นต่ำ {min_totalprice} บาท
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#01B14F] w-[70px] flex justify-center items-center text-[white] text-[16px] rounded-md"></div>
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className="h-[auto] mt-[20px] max-w-[700px] bg-white rounded-md w-[95%]">
            <div className="border-b-[1px] py-[16px]">
              <span className="text-[24px] font-[500] px-[5%]">
                สรุปคำสั่งซื้อ
              </span>
            </div>
            <div className="flex flex-col overflow-scroll max-h-[75vh] mt-[20px]">
              {user_cart?.map(
                (item: {
                  menu_id: string;
                  amount: number;
                  menu_image_url: string;
                  menu_name: string;
                  menu_price: string;
                  menu_totalprice: number;
                  restaurant_id: string;
                  restaurant_name: string;
                }) => {
                  return (
                    <div>
                      <div className="flex min-h-[80px] border-b-[1px] py-[10px]">
                        <div className="w-[20%] flex justify-center items-center">
                          <RemoveIcon
                            className="text-[16px] md:text-[24px] text-[#00A5CF]"
                            onClick={() => {
                              let result = user_cart.find(
                                //เช็คหาดูว่ามีสินค้านี้อยู่ในตะกร้าอยู่แล้วหรือไม่
                                (list: {
                                  menu_id: string;
                                  amount: number;
                                  menu_image_url: string;
                                  menu_name: string;
                                  menu_price: string;
                                  menu_totalprice: number;
                                  restaurant_id: string;
                                  restaurant_name: string;
                                }) => {
                                  return list.menu_id == item.menu_id;
                                }
                              );
                              if (result != undefined) {
                                if (item.amount > 0) {
                                  item.amount--;
                                  item.menu_totalprice =
                                    Number(item.menu_price) *
                                    Number(item.amount);

                                  let newCart = user_cart;

                                  window.localStorage.removeItem("cart");
                                  createCarttoLocalStorage(newCart);
                                } else {
                                  console.log("show");
                                }
                              }
                              console.log(user_cart);
                            }}
                          />
                          <span className="mx-[5px] md:mx-[10px]">
                            {item.amount}
                          </span>
                          <AddIcon
                            className="text-[16px] md:text-[24px] text-[#00A5CF]"
                            onClick={() => {
                              let result = user_cart.find(
                                //เช็คหาดูว่ามีสินค้านี้อยู่ในตะกร้าอยู่แล้วหรือไม่
                                (list: {
                                  menu_id: string;
                                  amount: number;
                                  menu_image_url: string;
                                  menu_name: string;
                                  menu_price: string;
                                  menu_totalprice: number;
                                  restaurant_id: string;
                                  restaurant_name: string;
                                }) => {
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
                }
              )}
            </div>
            {/* <div className="flex flex-col  mt-[20px] max-w-[700px] bg-white px-[20px] mb-[16px]">
          {user_cart.map((item) => {
            let deleteItemIcon = "hide";
            return (
              <div className="" key={item.menu_id}>
                <div className="flex min-h-[80px] border-b-[1px] py-[10px]">
                  <div className="w-[20%] flex justify-center items-center">
                    {deleteItemIcon == "show" && <DeleteOutlineIcon />}
                    {deleteItemIcon == "hide" && (
                      <RemoveIcon
                        className="text-[16px] md:text-[24px] text-[#00A5CF]"
                        onClick={() => {
                          let result = user_cart.find(
                            //เช็คหาดูว่ามีสินค้านี้อยู่ในตะกร้าอยู่แล้วหรือไม่
                            (list) => {
                              return list.menu_id == item.menu_id;
                            }
                          );
                          if (result != undefined) {
                            if (item.amount > 0) {
                              item.amount--;
                              item.menu_totalprice =
                                Number(item.menu_price) * Number(item.amount);

                              let newCart = user_cart;

                              window.localStorage.removeItem("cart");
                              createCarttoLocalStorage(newCart);
                            } else {
                              deleteItemIcon = "show";
                              console.log("show");
                            }
                          }
                          console.log(user_cart);
                        }}
                      />
                    )}
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
        </div> */}
            <div className="my-[40px] px-[20px]">
              <div className="flex justify-between">
                <span>รวมค่าอาหาร</span> <span>฿ {totalprice}</span>
              </div>
              <div className="flex justify-between">
                <span>ส่วนลด</span> <span>฿ {discount}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าส่ง</span>
                <span>{deliveryCost}</span>
              </div>
            </div>
          </div>
          <div className="h-[auto] mt-[20px] max-w-[700px] bg-white rounded-md w-[95%] mb-[150px]">
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
          <div className="fixed bottom-0 flex justify-center w-full min-h-[100px] items-center bg-white px-[12px]">
            <div className="flex justify-between items-center my-[20px] max-w-[700px] md:w-[50%] bg-white rounded-md w-[95%]">
              <div>
                <div className="text-[18px] font-[300]">รวมทั้งหมด</div>
                <div className="text-[24px] font-[500]">฿{lastprice}</div>
              </div>
              <Button
                variant="contained"
                className="bg-[#01B14F] w-full h-[48px] rounded-md focus:bg-[#01B14F] hover:bg-[#01B14F] max-w-[150px] md:max-w-[200px]"
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
                        coupon_id,
                        restaurant_id,
                        paymethod,
                        deliveryCost,
                        user_latitude,
                        user_longitude,
                        notetoDriver,
                        addressDetail,
                        discount,
                      },
                      user_cart,
                    ];
                    addBill(data);
                    console.log("clearCart");

                    clearCart();
                  } else {
                    let countdown = 2;
                    setNoLocationPopup("open");
                    let timer = setInterval(() => {
                      countdown--;
                      console.log(countdown);

                      if (countdown == 0) {
                        setNoLocationPopup("close");
                        clearInterval(timer);
                      }
                    }, 1000);

                    console.log("NEED LOCATION");
                  }
                }}
              >
                ยืนยันรายการสั่งซื้อ
              </Button>
            </div>
          </div>
        </div>
      )}
      {user_cart.length == 0 && (
        <div className="pt-[200px] bg-white w-full pb-[20px] text-center">
          <span className="text-[32px] font-bold">
            คุณยังไม่มีสินค้าในตะกร้า
          </span>
        </div>
      )}
    </div>
  );
};

export default ConfirmPage;
