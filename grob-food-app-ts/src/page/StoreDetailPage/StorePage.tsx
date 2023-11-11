import React from "react";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
import { Link, useParams } from "react-router-dom";
import { Navbarauth } from "../Home/components";
import axios from "axios";
import Login from "../Login-pages/Login";
import Footer from "../Footer/Footer";
import { Alert, AlertTitle, Button } from "@mui/material";
const StorePage = ({ clearToken, createCart }) => {
  //CHECK LOGIN
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  const { resid } = useParams();
  const restaurant_id = { restaurant_id: resid };
  const [storeDetail, setStoreDetail] = useState([]);
  const [storeTopic, setStoreTopic] = useState([]);
  const [addmenuStateCheck, setAddmenuStateCheck] = useState(false);
  const [changeStore, setChangeStore] = useState(false);
  const cart: any = localStorage.getItem("cart");
  let user_cart = JSON.parse(cart);
  const getStoreDetailAPI = async () => {
    console.log();
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getstoredetail`,
      restaurant_id
    );
    if (response.data.success) {
      console.log(response.data.data);

      setStoreDetail(response.data.data);
      setStoreTopic(response.data.topic);
      console.log(storeDetail);

      console.log("api success");
    } else {
      console.log("err");
    }
  };

  useEffect(() => {
    getStoreDetailAPI();
  }, []);
  return (
    <div className=" bg-[#F7F7F7]">
      <Navbarauth clearToken={clearToken} />
      {addmenuStateCheck == true && (
        <div className="fixed top-[80px] left-[50%] translate-x-[-50%]">
          <Alert severity="error" className="mb-[40px]  shadow-xl">
            <AlertTitle>กรุณาเข้าสู่ระบบก่อนทำการสั่งอาหาร</AlertTitle>
            <div className="mt-[20px] flex justify-center">
              <Button
                variant="contained"
                className="bg-[#01B14F] md:min-w-[80px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F] z-0 my-[10px] mr-[10px]"
              >
                ยืนยัน
              </Button>
              <Button
                variant="contained"
                className="bg-[#ff4040] md:min-w-[80px] max-w-[400px] focus:bg-[#ff4040] hover:bg-[#ff4040] z-0 my-[10px] mr-[10px]"
              >
                ยกเลิก
              </Button>
            </div>
          </Alert>
        </div>
      )}
      {changeStore == true && (
        <div className=" fixed top-[80px] left-[50%] translate-x-[-50%]">
          <Alert severity="error" className="mb-[40px]  shadow-xl">
            <AlertTitle>คุณยืนยันที่จะเปลี่ยนร้านใช่หรือไม่</AlertTitle>
            <div className="mt-[20px] flex justify-center">
              <Button
                variant="contained"
                className="bg-[#01B14F] md:min-w-[80px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F] z-0 my-[10px] mr-[10px]"
                onClick={() => {
                  createCart([]);
                  setChangeStore(false);
                }}
              >
                ยืนยัน
              </Button>
              <Button
                variant="contained"
                className="bg-[#ff4040] md:min-w-[80px] max-w-[400px] focus:bg-[#ff4040] hover:bg-[#ff4040] z-0 my-[10px] mr-[10px]"
                onClick={() => {
                  setChangeStore(false);
                }}
              >
                ยกเลิก
              </Button>
            </div>
          </Alert>
        </div>
      )}
      {storeDetail.length !== 0 && (
        <div className="">
          {/* Detail */}
          <div className=" bg-white md:pt-[10px] lg:pt-[20px] lg:px-[10%] ">
            <div className="w-full flex items-center justify-center mb-[4px] rounded-l-lg md:hidden">
              <img
                className="bg-cover w-full"
                src={`data:image/png;base64,${storeDetail[0].restaurants_image_url}`}
                alt="menu-image"
              />
            </div>
            <div className="mx-[12px] mt-[24px]">
              <div>
                <span className="text-[#4ca3b3]">บ้าน</span>{" "}
                <ArrowForwardIosIcon className="text-[16px]" />{" "}
                <Link to={"/allstore"}>
                  <span className="text-[#4ca3b3]">ร้านทั้งหมด</span>
                </Link>
                <ArrowForwardIosIcon className="text-[16px]" />{" "}
                <span className="text-[#1c1c1c]">
                  {storeDetail[0].restaurant_name}
                </span>
              </div>
              <div className="text-[24px] lg:text-[36px] font-[500] mb-[10px]">
                {storeDetail[0].restaurant_name}
              </div>
              <div className="text-[#676767] text-[14px] my-[6px]">
                {storeDetail[0].restaurant_catagory}
              </div>
              <div className="flex items-center text-[12px] text-[#505050] my-[6px]">
                <StarIcon className="text-[18px] text-[#F7C942] mr-[10px]" />{" "}
                <span className="text-[14px] font-[300]">
                  {storeDetail[0].score}
                </span>
              </div>
              <div className="text-[14px] text-[#505050] font-[400] pb-[10px]">
                <span className="mr-[36px] font-[500]">
                  เวลาเปิดให้บริการ :
                </span>{" "}
                {storeDetail[0].open_time} - {storeDetail[0].close_time}
              </div>
            </div>
          </div>
          {/* MenuList */}
          <div className="lg:px-[10%]">
            {storeTopic?.map((item) => {
              let topic_name = item.restaurant_topic_name;
              return (
                <div
                  key={item.restaurant_topic_name}
                  className="flex flex-col gap-1  my-[10px] bg-white lg:bg-[#F7F7F7] bg pt-[20px] px-[10px] lg:px-[0px] md:px-[36px] "
                >
                  <span className="text-[20px] lg:text-[28px] font-[500] mb-[24px]">
                    {item.restaurant_topic_name}
                  </span>
                  <div className="flex flex-col lg:flex-row">
                    {storeDetail?.map((item) => {
                      if (item.restaurant_topic_name == topic_name) {
                        return (
                          <div
                            key={item.menu_name}
                            className="flex gap-1 items-center justify-items-center mb-[20px] pb-[12px] h-[100%] border-b-[1px] lg:w-[300px] lg:bg-white lg:p-[10px] lg:rounded-lg lg:mr-[15px]"
                          >
                            <div className="w-[97px] h-[97px] md:w-[130px] md:h-[130px]  rounded-md flex-0.5">
                              <img
                                className="bg-cover w-full rounded-md"
                                src={`data:image/png;base64,${item.menu_image_url}`}
                                alt="menu-image"
                              />
                            </div>
                            <div className="flex flex-col h-[97px] w-[100%] justify-between flex-1">
                              <div className="text-[16px] font-[300] text-[#1c1c1c]">
                                {item.menu_name}
                              </div>
                              <div className="w-full flex justify-between">
                                <div className="text-[18px] text-[#1c1c1c] font-[500]">
                                  {item.price}
                                </div>
                                <div
                                  className="w-[32px] h-[32px] rounded-[50%] bg-[#00B14F] flex justify-center items-center"
                                  onClick={() => {
                                    if (!getOwner) {
                                      //ดูว่า loing หรือยัง ถ้ายังให้ user ไป login
                                      setAddmenuStateCheck(true);
                                    } else {
                                      if (user_cart.length == 0) {
                                        //ดูว่ามี สินค้าในตะกร้าหรือยังถ้ายังก็เพิ่ม
                                        user_cart.push({
                                          restaurant_id:
                                            storeDetail[0].restaurant_id,
                                          menu_name: item.menu_name,
                                          menu_price: item.price,
                                          menu_id: item.menu_id,
                                          amount: 1,
                                        });
                                        createCart(user_cart);
                                      } else {
                                        //ถ้ามีแล้วก็ตรวจสอบว่าสินค้าที่เพิ่มเข้ามาใหม่ มี restaurant_id เดียวกับรายการก่อนหน้าหรือไม่
                                        if (
                                          //ถ้าไม่เหมือน
                                          user_cart[0].restaurant_id !=
                                          storeDetail[0].restaurant_id
                                        ) {
                                          console.log("คนละร้าน");
                                          setChangeStore(true);
                                          console.log(
                                            user_cart[0].restaurant_id,
                                            storeDetail[0].restaurant_id
                                          );
                                        } else {
                                          //ถ้าเหมือน
                                          // user_cart.forEach((i) => {
                                          //   console.log(i.menu_id, "ITEM");
                                          //   if (i.menu_id == item.menu_id) {
                                          //     console.log("ซ้ำ");
                                          //   }
                                          // });

                                          user_cart.push({
                                            restaurant_id:
                                              storeDetail[0].restaurant_id,
                                            menu_name: item.menu_name,
                                            menu_price: item.price,
                                            menu_id: item.menu_id,
                                            amount: 1,
                                          });
                                          createCart(user_cart);
                                        }
                                      }
                                    }
                                  }}
                                >
                                  <AddIcon className="text-[white]" />
                                </div>
                              </div>
                            </div>

                            {/* {menus.length !== 0 && <div>{menus[0].menu_name}</div>} */}
                          </div>
                        );
                      }
                    })}
                  </div>
                  {/* {menus.length !== 0 && <div>{menus[0].menu_name}</div>} */}
                </div>
              );
            })}
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default StorePage;
