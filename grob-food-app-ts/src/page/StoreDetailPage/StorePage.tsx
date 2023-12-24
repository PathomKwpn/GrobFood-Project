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

interface storeDetail {
  close_time: string;
  latitude: string;
  longitude: string;
  menu_id: string;
  menu_image_url: string;
  menu_name: string;
  open_time: string;
  price: string;
  restaurant_catagory: string;
  restaurant_id: string;
  restaurant_name: string;
  restaurant_topic_name: string;
  restaurants_image_url: string;
  score: string;
}

interface storeTopic {
  restaurant_topic_id: string;
  restaurant_topic_name: string;
}
const StorePage = ({ createCart }: any) => {
  //CHECK LOGIN
  const getOwner: any = localStorage.getItem("user");
  const user_info = JSON.parse(getOwner);

  if (!getOwner) {
    return <Login />;
  }
  const user_id = user_info?.id;
  console.log(user_id);
  const { resid } = useParams();
  const restaurant_id = { restaurant_id: resid };
  const [storeDetail, setStoreDetail] = useState<Array<storeDetail>>([]);
  const [storeTopic, setStoreTopic] = useState<Array<storeTopic>>([]);
  const [addmenuStateCheck, setAddmenuStateCheck] = useState(false);
  const [changeStore, setChangeStore] = useState(false);
  const [doubleMenu, setDoubleMenu] = useState(false);
  const [userLatitude, setUserLatitude] = useState("");
  const [userLongitude, setUserLongitude] = useState("");
  const cart: any = localStorage.getItem("cart");
  let user_cart = JSON.parse(cart);
  const getStoreDetailAPI = async () => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getstoredetail`,
      restaurant_id
    );
    if (response.data.success) {
      setStoreDetail(response.data.data);
      setStoreTopic(response.data.topic);

      console.log("api success");
    } else {
      console.log("err");
    }
  };
  const getLoaction: any = localStorage.getItem("location");
  let user_location = JSON.parse(getLoaction);
  useEffect(() => {
    getStoreDetailAPI();
    if (user_location) {
      setUserLatitude(user_location.latitude);
      setUserLongitude(user_location.longitude);
    }
  }, []);
  function getDistanceBetweenPointsNew(
    latitude1: any,
    longitude1: any,
    latitude2: any,
    longitude2: any,
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
  function deg2rad(deg: any) {
    return deg * (Math.PI / 180);
  }
  function rad2deg(rad: any) {
    return rad * (180 / Math.PI);
  }
  let haveLocation = false;
  let distance: any;
  let time;
  let timeMin;

  if (storeDetail.length != 0 && userLatitude != "") {
    haveLocation = true;
    distance = getDistanceBetweenPointsNew(
      storeDetail[0].latitude,
      storeDetail[0].longitude,
      userLatitude,
      userLongitude
    );
    time = distance / 80;
    timeMin = (10 + time * 60).toFixed(0);
  }
  return (
    <div className=" bg-[#F7F7F7]">
      <Navbarauth />
      {doubleMenu == true && (
        <div className=" fixed top-[10%] md:w-[400px] w-[250px]  left-[50%] translate-x-[-50%] rounded-md shadow-md">
          <Alert className="md:text-[20px]" severity="error">
            คุณมีสินค้านี้อยู่ในตะกร้าแล้ว
          </Alert>
        </div>
      )}
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
        <div className="mt-[100px]">
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
                <Link to={"/home"}>
                  <span className="text-[#4ca3b3] cursor-pointer">บ้าน</span>
                </Link>
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
                {haveLocation == true && (
                  <div className="flex mx-[16px] gap-2">
                    <div className="text-[16px] text-[#9c9c9c]">
                      {timeMin} นาที
                    </div>
                    <div className="text-[16px] text-[#9c9c9c]">
                      {distance} km.
                    </div>
                  </div>
                )}
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
                  <div className="flex flex-col lg:flex-row flex-wrap">
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
                                  className="w-[32px] h-[32px] rounded-[50%] bg-[#00B14F] flex justify-center items-center cursor-pointer"
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
                                          restaurant_name:
                                            storeDetail[0].restaurant_name,
                                          menu_id: item.menu_id,
                                          menu_image_url: item.menu_image_url,
                                          amount: 1,
                                          menu_totalprice:
                                            Number(item.price) * 1,
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
                                          let result = user_cart.find(
                                            //เช็คหาดูว่ามีสินค้านี้อยู่ในตะกร้าอยู่แล้วหรือไม่
                                            (list: any) => {
                                              return (
                                                list.menu_id == item.menu_id
                                              );
                                            }
                                          );
                                          console.log(result);

                                          if (result == undefined) {
                                            user_cart.push({
                                              restaurant_id:
                                                storeDetail[0].restaurant_id,
                                              restaurant_name:
                                                storeDetail[0].restaurant_name,
                                              menu_name: item.menu_name,
                                              menu_price: item.price,
                                              menu_id: item.menu_id,
                                              menu_image_url:
                                                item.menu_image_url,
                                              amount: 1,
                                              menu_totalprice:
                                                Number(item.price) * 1,
                                            });
                                            createCart(user_cart);
                                          } else {
                                            console.log("ซ้ำ");
                                            let countdown = 3;
                                            setDoubleMenu(true);
                                            let timer = setInterval(() => {
                                              countdown--;
                                              console.log(countdown);

                                              if (countdown == 0) {
                                                setDoubleMenu(false);
                                                clearInterval(timer);
                                              }
                                            }, 1000);
                                          }
                                          // user_cart.forEach((i) => {
                                          //   console.log(i.menu_id, "ITEM");
                                          //   if (i.menu_id == item.menu_id) {
                                          //     console.log("ซ้ำ");
                                          //   }
                                          // });
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
