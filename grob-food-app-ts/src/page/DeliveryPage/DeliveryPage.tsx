import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
// import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useToken } from "../../util/token/token";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import { Alert, Button, MenuList } from "@mui/material";
import gifDriver from "../../../public/image/grab-driver/giphy.gif";
import ComingDriver from "../../../public/image/grab-driver/Coming.png";
import DriverResAlready from "../../../public/image/grab-driver/GoRestaurant.png";
import axios from "axios";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";

interface menuList {
  amount: number;
  bill_id: string;
  cart_id: string;
  create_by: string;
  create_date: string;
  menu_id: string;
  menu_name: string;
  price: string;
}
interface billDetail {
  addres_detail: string;
  bill_date: string;
  bill_id: string;
  bill_status: string;
  coupon_id: string;
  create_date: string;
  discount: string;
  driver_id: string;
  last_price: string;
  note_to_driver: string;
  paymethod: string;
  restaurant_id: string;
  shipping_cost: string;
  total_price: string;
  user_id: string;
  user_latitude: string;
  user_longitude: string;
}
const DeliveryPage = () => {
  const nevigate = useNavigate();
  const [driverStatusPic, setDriverStatusPic] = useState(gifDriver);
  //GET USER FROM LOCALSTORAGE
  const user_name: any = localStorage.getItem("user");
  let user_info = JSON.parse(user_name);
  let user_id = { user_id: user_info.id };

  //GET CART FROM LOCALSTORAGE
  const cart: any = localStorage.getItem("cart");
  let user_cart = JSON.parse(cart);

  const [deliveryStatus, setDeliveryStatus] = useState(
    "กำลำตรวจสอบคำสั่งซื้อของคุณ"
  );
  //POPUP STATE
  // const [alertNoMenu, setAlertNoMenu] = useState<"active" | "close">("close");
  // const [cartState, setCartState] = useState<"open" | "close">("close");
  const [memuList, setMenuList] = useState<Array<menuList>>();
  const [billDetail, setBillDetail] = useState<Array<billDetail>>([]);
  const [haveBill, setHaverBill] = useState(false);
  const { updateToken, clearToken } = useToken();
  const getBillmenuList = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getbillmenulist`,
      data
    );
    if (response.data.success) {
      setMenuList(response.data.data);
    } else {
      console.log("Error");
    }
  };
  const getUserBill = async (data: any, timer: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/getuserbill`, data);
    if (response.data.success && response.data.data.length != 0) {
      setHaverBill(true);
      setBillDetail(response.data.data);
      let getBilmenu = { bill_id: response.data.data[0].bill_id };
      if (user_name) {
        if (response.data.data[0].bill_status == "order success") {
          console.log("succcess");
        } else if (response.data.data[0].bill_status == "Find Driver") {
          setDeliveryStatus("เรากำลังหาคนขับให้คุณ");
          setDriverStatusPic(gifDriver);
          console.log("หาคนขับ");
        } else if (response.data.data[0].bill_status == "ถึงร้านอาหารแล้ว") {
          setDeliveryStatus("คนขับถึงร้านอาหารแล้ว");
          setDriverStatusPic(DriverResAlready);
          console.log("คนขับถึงร้านอาหารแล้ว");
        } else if (response.data.data[0].bill_status == "กำลังไปส่งอาหาร") {
          console.log("คนขับถึงกำลังมาส่งอาหารให้คุณ");
          setDeliveryStatus("คนขับถึงกำลังมาส่งอาหารให้คุณ");
          setDriverStatusPic(ComingDriver);
        } else if (response.data.data[0].bill_status == "คำสั่งซื้อเสร็จสิ้น") {
          setDeliveryStatus("คำสั่งซื้อเสร็จสิ้น");
          console.log("เสร็จแล้ว ล้างtimer");
          console.log("success แล้วเด้อ");
        } else if (response.data.data[0].bill_status == "order success") {
          setDeliveryStatus("ขอบคุณสำหรับคำสั่งซื้อ");
          clearInterval(timer);
          console.log("เสร็จแล้ว ล้างtimer");
          console.log("success แล้วเด้อ");
        }
      }
      getBillmenuList(getBilmenu);
    } else {
      console.log("Error");
      clearInterval(timer);
      setHaverBill(false);
    }
  };
  useEffect(() => {
    let timer = setInterval(() => {
      getUserBill(user_id, timer);
    }, 5000);
  }, []);
  //CALC TOTALPRICE
  let totalprice = 0;
  for (let i = 0; i < user_cart.length; i++) {
    totalprice += Number(user_cart[i].menu_totalprice);
  }

  //CART
  return (
    <div className="bg-[#01B14F] min-h-[100vh] flex flex-col  items-center">
      <nav className="flex fixed z-[1000] justify-center items-center h-[48px] md:h-[88px]  top-0 bg-white shadow-sm w-full">
        <div className="w-[100%] px-[12px] md:px-[36px]">
          <div className="flex justify-between">
            <div className="w-[90px] h-[auto] md:w-[140px] p-1">
              <Link to={"/home"}>
                <img src="../image/logo-grabfood/logo-GrobFood.png" alt="" />
              </Link>
            </div>
            <div className="flex ">
              <div className="flex justify-center items-center border border-[#f0efef] mx-[6px] rounded-[4px]">
                <Link
                  to={""}
                  className="flex justify-center items-center text-[12px] px-[8px] font-[500] text-[#676767] h-[28px] md:h-[40px]"
                  onClick={() => {
                    updateToken();
                    nevigate("/userprofile");
                  }}
                >
                  {user_info.firstname}
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
      </nav>
      {haveBill == true && (
        <header className="w-full flex h-[400px] flex-col justify-center items-center mt-[30px] md:mt-[80px]">
          <img
            className="max-w-[300px] bg-cover bmax-h-[300px]"
            src={driverStatusPic}
            alt="driver-dance"
          />
          <p className="text-[32px] font-bold my-[10px] text-[white]">
            {deliveryStatus}..
          </p>
        </header>
      )}
      {haveBill == false && (
        <header className="w-full flex h-[400px] flex-col justify-center items-center mt-[30px] md:mt-[80px]">
          <p className="text-[32px] font-bold my-[10px] text-[white]">
            {deliveryStatus}..
          </p>
        </header>
      )}
      {billDetail.length != 0 && haveBill == true && (
        <div className="h-[auto] mt-[20px]  md:w-[50%] bg-white rounded-md w-[95%] max-w-[300px] mx-[10px] shadow-sm">
          <div className="border-b-[1px] py-[16px]">
            <span className="text-[24px] font-[500] px-[5%]">
              สรุปคำสั่งซื้อ
            </span>
          </div>
          <div className="flex justify-center flex-col items-center w-full">
            <div className="my-[16px] font-bold text-[18px]">รายการอาหาร</div>
            {memuList != undefined && (
              <div className="w-full px-[16px]">
                {memuList?.map((order) => {
                  return (
                    <div
                      key={order.menu_id}
                      className="flex justify-between w-[100%]"
                    >
                      <span>{order.amount}x </span>
                      <span className="text-[#5a5a5a]">{order.menu_name}</span>
                      <span>{order.price}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="my-[40px] px-[20px]">
            <div className="flex justify-between">
              <span>รวมค่าอาหาร</span> <span>฿{billDetail[0].total_price}</span>
            </div>
            <div className="flex justify-between">
              <span>ส่วนลด</span>
              <span>฿{billDetail[0].discount}</span>
            </div>

            <div className="flex justify-between">
              <span>ค่าส่ง</span>
              <span>฿{billDetail[0].shipping_cost}</span>
            </div>
            <div className="flex justify-between mt-[16px]">
              <span className="text-[24px] font-bold">รวมทั้งหมด</span>{" "}
              <span className="flex justify-center items-center">
                ฿{billDetail[0].last_price}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryPage;
