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
import DeliveryGrabFood from "../../../public/image/logo-grabfood/DeliveryGrabFood.png";
import StoreIcon from "@mui/icons-material/Store";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
import { Button } from "@mui/material";

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
  vote_status: string;
}
const DeliveryPage = () => {
  const [voteDriver, setVoteDriver] = useState<number | null>(0);
  const [voteRestaurant, setVoteRestaurant] = useState<number | null>(0);

  const labels: { [index: string]: string } = {
    0: "แย่มาก",
    1: "ปรับปรุง",
    2: "พอใช้",
    3: "ปานกลาง",
    4: "ดี",
    5: "ดีมาก",
  };

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
    "กำลังตรวจสอบคำสั่งซื้อของคุณ"
  );
  //POPUP STATE
  // const [alertNoMenu, setAlertNoMenu] = useState<"active" | "close">("close");
  // const [cartState, setCartState] = useState<"open" | "close">("close");
  const [memuList, setMenuList] = useState<Array<menuList>>();
  const [billDetail, setBillDetail] = useState<Array<billDetail>>([]);
  const [billState, setBillState] = useState<"Have" | "notHave">("notHave");
  const [billVote, setBillVote] = useState<"Vote" | "notVote">("notVote");
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
  const userVote = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/uservote`, data);
    if (response.data.success) {
      console.log(response.data.data);
    } else {
      console.log("Error");
    }
  };
  const getUserBill = async (data: any, timer: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/getuserbill`, data);
    if (response.data.success && response.data.data.length != 0) {
      setBillState("Have");
      setBillDetail(response.data.data);
      console.log(response.data.data);

      let getBilmenu = { bill_id: response.data.data[0].bill_id };
      if (user_name) {
        if (
          response.data.data[0].bill_status == "order success" &&
          response.data.data[0].vote_status == "none"
        ) {
          setDeliveryStatus("ขอบคุณสำหรับคำสั่งซื้อ");
          setDriverStatusPic(DeliveryGrabFood);
          setBillVote("Vote");
          clearInterval(timer);
        } else if (response.data.data[0].bill_status == "Find Driver") {
          setDeliveryStatus("เรากำลังหาคนขับให้คุณ");
          setDriverStatusPic(gifDriver);
        } else if (response.data.data[0].bill_status == "Find Driver Success") {
          setDeliveryStatus("เราหาคนขับให้คุณได้แล้ว");
          setDriverStatusPic(gifDriver);
        } else if (response.data.data[0].bill_status == "ถึงร้านอาหารแล้ว") {
          setDeliveryStatus("คนขับถึงร้านอาหารแล้ว");
          setDriverStatusPic(DriverResAlready);
        } else if (response.data.data[0].bill_status == "กำลังไปส่งอาหาร") {
          setDeliveryStatus("คนขับถึงกำลังมาส่งอาหารให้คุณ");
          setDriverStatusPic(ComingDriver);
        } else if (response.data.data[0].bill_status == "คำสั่งซื้อเสร็จสิ้น") {
          setDeliveryStatus("คำสั่งซื้อเสร็จสิ้น");
          setDriverStatusPic(DeliveryGrabFood);
          setBillVote("Vote");

          clearInterval(timer);
        }
      }
      getBillmenuList(getBilmenu);
    } else {
      console.log("Error RRR");
      setDeliveryStatus("ไม่พบคำสั่งซื้อของคุณ");
      clearInterval(timer);
      setBillState("notHave");
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
    <div className="bg-[#248b53] min-h-[100vh] flex flex-col  items-center">
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
      <div className="w-full flex flex-col items-center justify-center">
        {(billState == "Have") == true && (
          <header className="w-full flex h-[400px] flex-col justify-center items-center mt-[30px] md:mt-[80px]">
            <img
              className="max-w-[300px] bg-cover bmax-h-[300px] "
              src={driverStatusPic}
              alt="driver-dance"
            />
            <p className="text-[32px] font-bold my-[10px] text-[white] text-center">
              {deliveryStatus}..
            </p>
          </header>
        )}
        {billState == "notHave" && (
          <header className="w-full flex h-[400px] flex-col justify-center items-center mt-[30px] md:mt-[80px]">
            <p className="text-[32px] font-bold my-[10px] text-[white] text-center">
              {deliveryStatus}..
            </p>
          </header>
        )}
        {billDetail.length != 0 && billState == "Have" && (
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
                        <span className="text-[#5a5a5a]">
                          {order.menu_name}
                        </span>
                        <span>{order.price}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="my-[40px] px-[20px]">
              <div className="flex justify-between">
                <span>รวมค่าอาหาร</span>{" "}
                <span>฿{billDetail[0].total_price}</span>
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
      {billVote == "Vote" && (
        <div className=" absolute w-full min-h-[100vh] bg-[black] flex justify-center items-center bg-opacity-60">
          <div className="flex flex-col bg-white p-[24px] w-[95%] rounded-lg max-w-[400px] border-[2px] border-[black]">
            {/* <div className="flex flex-row w-full justify-center">
              <StarIcon className="text-[48px] text-[#FFD700]" />
              <StarIcon className="text-[48px] text-[#FFD700]" />
              <StarIcon className="text-[48px] text-[#FFD700]" />
              <StarIcon className="text-[48px] text-[#FFD700]" />
              <StarIcon className="text-[48px] text-[#FFD700]" />
            </div> */}
            <header className="text-[24px] font-bold mb-[24px] text-center">
              โปรดช่วยให้คะแนนร้านและคนขับ
            </header>
            <div className="flex flex-col justify-center items-center">
              <header className="font-bold text-[18px] flex flex-row justify-center items-center">
                ให้คะแนนร้าน <StoreIcon className="text-[#01B14F]" />
              </header>
              <Rating
                className="text-[36px]"
                name="simple-controlled"
                value={voteRestaurant}
                onChange={(event, newValue: number | null) => {
                  setVoteRestaurant(newValue);
                  console.log(event);
                }}
                // onChangeActive={(event, newHover) => {
                //   setHover(newHover);
                // }}
              />
              {voteRestaurant !== null && <div>{labels[voteRestaurant]}</div>}
            </div>
            <div className="flex flex-col justify-center items-center">
              <header className="font-bold text-[18px] flex flex-row justify-center items-center">
                ให้คะแนนคนขับ
                <SportsMotorsportsIcon className="text-[#01B14F]" />
              </header>
              <Rating
                className="text-[36px]"
                name="simple-controlled"
                value={voteDriver}
                onChange={(event, newValue: number | null) => {
                  setVoteDriver(newValue);
                  console.log(event);
                }}
                // onChangeActive={(event, newHover) => {
                //   setHover(newHover);
                // }}
              />
              {voteDriver !== null && (
                <span className="mb-[24px]">{labels[voteDriver]}</span>
              )}
            </div>
            <Button
              variant="contained"
              className="bg-[#01B14F] md:min-w-[80px] max-w-[400px] focus:bg-[#01B14F] hover:bg-[#01B14F] z-0 my-[5px]"
              onClick={() => {
                let data = {
                  bill_id: billDetail[0].bill_id,
                  user_id: billDetail[0].user_id,
                  restaurant_id: billDetail[0].restaurant_id,
                  restaurant_score: voteRestaurant,
                  driver_score: voteDriver,
                  driver_id: billDetail[0].driver_id,
                };
                console.log(voteDriver, voteRestaurant, "SCORE");
                setBillVote("notVote");
                setDeliveryStatus("ขอบคุณสำหรับคำสั่งซื้อ");
                setDriverStatusPic(DeliveryGrabFood);
                userVote(data);
              }}
            >
              ยืนยัน
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryPage;
