import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../../../util/token/token";

//ICON
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Alert, Button } from "@mui/material";
import axios from "axios";
import { GROBFOOD_USER_URL } from "../../../../util/constants/constant";

const Navbarauth = () => {
  const nevigate = useNavigate();
  const [haveBill, setHaverBill] = useState(false);
  //GET USER FROM LOCALSTORAGE
  const user_name: any = localStorage.getItem("user");
  let user_firstname = JSON.parse(user_name);

  let user_id = { user_id: user_firstname.id };
  //GET CART FROM LOCALSTORAGE
  const cart: any = localStorage.getItem("cart");
  let user_cart = JSON.parse(cart);

  //POPUP STATE
  const [alertNoMenu, setAlertNoMenu] = useState<"active" | "close">("close");
  const [cartState, setCartState] = useState<"open" | "close">("close");

  const { updateToken, clearToken, createCarttoLocalStorage } = useToken();

  //CALC TOTALPRICE
  let totalprice = 0;
  for (let i = 0; i < user_cart.length; i++) {
    totalprice += Number(user_cart[i].menu_totalprice);
  }

  //CART
  const [CartList, setCartList] = useState();
  const getCartLocalStorage = async () => {
    const cart: any = localStorage.getItem("cart");
    let user_cart = JSON.parse(cart);
    setCartList(user_cart);
  };

  const getUserBill = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/getuserbill`, data);

    if (response.data.success && response.data.data.length != 0) {
      setHaverBill(true);
    } else {
      console.log("Error");
      console.log("ผู้ใช้ยังไม่ได้สั่งสินค้า");

      setHaverBill(false);
    }
  };
  useEffect(() => {
    getUserBill(user_id);
  });
  return (
    <>
      <div className="flex fixed z-[1000] justify-center items-center h-[48px] md:h-[88px]  top-0 bg-white shadow-sm w-full">
        {cartState == "open" && (
          <div className=" relative">
            <div
              className="bg-black w-[100vw]  h-[300vh] z-40 fixed opacity-40 top-0"
              onClick={() => {
                setCartState("close");
              }}
            ></div>
            <div className=" fixed  min-h-[100vh] translate-y-[0%] top-0 bg-white z-50  w-[100%] max-w-[600px] opacity-100 flex justify-between flex-col">
              <div className="max-h-[100%]">
                <div
                  className="h-[60px] flex items-center border-b-[1px]"
                  onClick={() => {
                    setCartState("close");
                  }}
                >
                  <CloseIcon />
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <span className="text-[20px] font-[500]">ตะกร้า</span>
                    <span>เวลาจัดส่ง</span>
                  </div>
                </div>
                {alertNoMenu == "active" && (
                  <Alert className="md:text-[20px]" severity="error">
                    คุณไม่มีสินค้านี้ในตะกร้า
                  </Alert>
                )}
                <div className="flex flex-col overflow-scroll max-h-[75vh] mt-[20px]">
                  {user_cart.map((item: any) => {
                    return (
                      <div>
                        <div className="flex min-h-[80px] border-b-[1px] py-[10px]">
                          <div className="w-[20%] flex justify-center items-center">
                            <RemoveIcon
                              className="text-[16px] md:text-[24px] text-[#00A5CF]"
                              onClick={() => {
                                let result = user_cart.find(
                                  //เช็คหาดูว่ามีสินค้านี้อยู่ในตะกร้าอยู่แล้วหรือไม่
                                  (list: any) => {
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
                                  (list: any) => {
                                    return list.menu_id == item.menu_id;
                                  }
                                );
                                if (result != undefined) {
                                  item.amount++;
                                  item.menu_totalprice =
                                    Number(item.menu_price) *
                                    Number(item.amount);

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
                  })}
                </div>
                {/* <Cart
                  createCarttoLocalStorage={createCarttoLocalStorage}
                  cart={CartList}
                /> */}
              </div>
              <div className="h-[150px] flex justify-center flex-col items-center shadow-[40px_35px_60px_10px_rgba(0.3,0.3,0.3,0.2)]">
                <div className="w-full flex justify-between px-[30px]">
                  <span className="text-[20px] font-[300]">รวมทั้งหมด</span>
                  <span className="text-[20px] font-[500]">฿{totalprice} </span>
                </div>
                <div className="w-full px-[30px] mt-[16px]">
                  <Button
                    variant="contained"
                    className="bg-[#01B14F] w-full h-[48px] rounded-md focus:bg-[#01B14F] hover:bg-[#01B14F]"
                    onClick={() => {
                      if (user_cart.length == 0) {
                        let countdown = 3;
                        setAlertNoMenu("active");
                        let timer = setInterval(() => {
                          countdown--;
                          console.log(countdown);

                          if (countdown == 0) {
                            setAlertNoMenu("close");
                            clearInterval(timer);
                          }
                        }, 1000);
                      } else {
                        nevigate("/confirmpage");
                      }
                    }}
                  >
                    ยืนยันรายการสั่งซื้อ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-[100%] px-[12px] md:px-[36px]">
          <div className="flex justify-between">
            <div className="w-[90px] h-[auto] md:w-[140px] p-1">
              <Link to={"/home"}>
                <img src="../image/logo-grabfood/logo-GrobFood.png" alt="" />
              </Link>
            </div>
            <div className="flex ">
              {/* <div className="flex relative cursor-pointer justify-center items-center text-[6px] font-semibold text-[#676767] border border-[#f0efef] px-[8px] mx-[6px] rounded-[4px] md:px-[10px]">
                <NotificationsActiveIcon />
              </div> */}

              <div
                className="flex relative cursor-pointer justify-center items-center text-[6px] font-semibold text-[#676767] border border-[#f0efef] px-[8px] mx-[6px] rounded-[4px] md:px-[10px]"
                onClick={() => {
                  nevigate("/deliverypage");
                  updateToken();
                }}
              >
                <ListAltIcon className="text-[#676767] text-[20px]" />

                {haveBill == true && (
                  <div className=" absolute text-[14px] right-[-40%] top-[10%] m-0 p-0 translate-x-[-50%] translate-y-[-50%]  w-[20px] h-[20px] flex justify-center items-center rounded-[50%]">
                    <NotificationImportantIcon className="text-[#eb4848]" />
                  </div>
                )}
              </div>

              <div
                className="flex relative cursor-pointer justify-center items-center text-[6px] font-semibold text-[#676767] border border-[#f0efef] px-[8px] mx-[6px] rounded-[4px] md:px-[10px]"
                onClick={() => {
                  setCartState("open");
                  getCartLocalStorage();
                  updateToken();
                }}
              >
                <ShoppingBagOutlinedIcon className="text-[#676767] text-[20px]" />
                {user_cart.length != 0 && (
                  <div className=" absolute text-[14px] right-[-40%] top-[10%] m-0 p-0 translate-x-[-50%] translate-y-[-50%] bg-red-500 w-[20px] h-[20px] flex justify-center items-center rounded-[50%]">
                    <span className="text-white font-[300]">
                      {user_cart.length}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center border border-[#f0efef] mx-[6px] rounded-[4px]">
                <Link
                  to={""}
                  className="flex justify-center items-center text-[12px] px-[8px] font-[500] text-[#676767] h-[28px] md:h-[40px]"
                  onClick={() => {
                    updateToken();
                    nevigate("/userprofile");
                  }}
                >
                  {user_firstname.firstname}
                </Link>
              </div>
              <div
                className="flex justify-center cursor-pointer items-center text-[12px] font-[500] text-[#676767] hover:text-[#ffffff] border border-[#f0efef] px-[8px] mx-[6px] rounded-[4px] gap-[3px] hover:bg-red-400"
                onClick={() => {
                  clearToken();
                  nevigate("/login");
                }}
              >
                <ExitToAppIcon />
              </div>
              <div className="flex justify-center items-center text-[12px] font-[500] text-[#676767] border border-[#f0efef] px-[8px] mx-[6px] rounded-[4px] gap-[3px]">
                TH
                <ExpandMoreIcon className="text-[18px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbarauth;
