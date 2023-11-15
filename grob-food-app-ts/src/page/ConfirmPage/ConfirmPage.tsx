import React, { useEffect, useState } from "react";
import { Navbarauth } from "../Home/components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useToken } from "../../util/token/token";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
const ConfirmPage = ({ clearToken }) => {
  const cart: any = localStorage.getItem("cart");
  const { createCarttoLocalStorage } = useToken();
  let user_cart = JSON.parse(cart);
  let totalprice = 0;
  for (let i = 0; i < user_cart.length; i++) {
    totalprice += Number(user_cart[i].menu_totalprice);
  }
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setLatitude(position.coords.latitude);
  //         setLongitude(position.coords.longitude);
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // }, []);
  console.log(user_cart);

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

      <div className="h-[auto] mt-[20px] max-w-[700px] md:w-[50%] bg-white rounded-md">
        <div className="border-b-[1px] py-[16px]">
          <span className="text-[24px] font-[500] px-[5%]">สรุปคำสั่งซื้อ</span>
        </div>
        <div className="flex flex-col  mt-[20px] max-w-[700px] bg-white px-[20px] mb-[16px]">
          {user_cart.map((item) => {
            return (
              <div className="">
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
            <span>ฟรี</span>
          </div>
        </div>
      </div>
      <div className="h-[auto] mt-[20px] max-w-[700px] md:w-[50%] bg-white rounded-md">
        <div className="border-b-[1px] py-[16px]">
          <span className="text-[24px] font-[500] px-[5%]">
            รายละเอียดการชำระเงิน
          </span>
        </div>
        <div className="flex flex-col justify-center content-center items-center w-[full] mt-[30px] mb-[200px]">
          <label className="w-[90%] mb-[16px]">วิธีชำระเงิน</label>
          <select
            id="paymethod"
            className="border-[2px] p-[10px] rounded-lg w-[90%]"
          >
            <option value="เงินสด">
              <LocalAtmIcon />
              เงินสด
            </option>
            <option value="โอนจ่าย">โอนจ่าย</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
