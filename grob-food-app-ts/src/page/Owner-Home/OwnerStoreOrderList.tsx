import axios from "axios";
import { useEffect, useState } from "react";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
import Login from "../Login-pages/Login";
import NavbarOwnerAuth from "./NavbarAuth/NavbarAuth";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useToken } from "../../util/token/token";
interface storeOrderList {
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
  restaurant_latitude: string;
  restaurant_longitude: string;
  restaurant_name: string;
  shipping_cost: string;
  total_price: string;
  userPhone: string;
  user_id: string;
  user_latitude: string;
  user_longitude: string;
}
const OwnerStoreOrderList = ({ clearToken }: any) => {
  const getOwner: any = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  const owner_info = JSON.parse(getOwner);
  const owner_id = owner_info.id;
  const sendOwner_id = { owner_id: owner_id };
  const { updateToken } = useToken();
  const [storeOrderList, setStoreOrderList] = useState<
    Array<storeOrderList> | "คุณยังไม่มีร้านค้า"
  >();
  const getStoreOrderList = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getStoreOrderList`,
      data
    );
    if (response.data.success) {
      setStoreOrderList(response.data.data);
    } else {
      console.log("GET STOREORDER ERROR");
    }
  };
  useEffect(() => {
    getStoreOrderList(sendOwner_id);
  }, []);



  return (
    <div>
      <NavbarOwnerAuth clearToken={clearToken} sendOwner_id={sendOwner_id} />
      {storeOrderList != "คุณยังไม่มีร้านค้า" && (
        <div>
          <header className="w-full text-[32px] font-bold flex justify-center my-[24px]">
            ORDER LIST
          </header>
          <div
            className="bg-[#009C49] hover:bg-[rgba(0,156,73,0.78)] w-[100px] flex justify-center items-center py-[8px] rounded-md mb-[12px] mx-[auto]  cursor-pointer"
            onClick={() => {
              updateToken();
              getStoreOrderList(sendOwner_id);
            }}
          >
            <span className="text-[white] font-bold">REFRESH</span>
            <RefreshIcon className="text-[white] font-bold" />
          </div>

          <div className="flex justify-center">
            <div className="bg-white w-[600px] h-[800px] overflow-scroll border-[1px] border-[#01B14F] shadow-md rounded-md">
              <div className="max-w-[800px]">
                <div className="w-full ">
                  <div className=" w-full bg-slate-100 h-[80px] flex flex-nowrap items-center justify-items-center gap-1  ">
                    <div className=" bg-[#009C49] text-[white] min-w-[100px] flex justify-center items-center h-[100%]">
                      รับออเดอร์
                    </div>
                    <div className=" bg-[#009C49] text-[white] min-w-[100px] flex justify-center items-center h-[100%]">
                      วันที่บิล
                    </div>
                    <div className=" bg-[#009C49] text-[white] min-w-[100px] flex justify-center items-center h-[100%]">
                      ชื่อร้าน
                    </div>
                    <div className=" bg-[#009C49] text-[white] min-w-[100px] flex justify-center items-center h-[100%]">
                      ยอดรวม
                    </div>
                    <div className=" bg-[#009C49] text-[white] min-w-[100px] flex justify-center items-center h-[100%]">
                      รูปแบบ
                    </div>
                    <div className=" bg-[#009C49] text-[white] min-w-[100px] flex justify-center items-center h-[100%]">
                      ที่อยู่ลูกค้า
                    </div>
                    <div className=" bg-[#009C49] text-[white] min-w-[100px] flex justify-center items-center h-[100%]">
                      เบอร์โทร
                    </div>
                  </div>
                </div>

                {storeOrderList?.map((item: any) => {
                  let createDate = new Date(item.bill_date);
                  let regisDay = createDate.getDate();
                  let regisMonth = createDate.getMonth();
                  let regisYear = createDate.getFullYear();
                  return (
                    <div key={item.bill_id}>
                      <div
                        className=" flex flex-nowrap items-center justify-items-center gap-1 "
                        key={item.bill_id}
                      >
                        <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex flex-col items-center justify-center mb-[4px] overflow-hidden">
                          <Button
                            variant="contained"
                            className="bg-[#01B14F] md:min-w-[200px] max-w-[400px] focus:bg-[#01B14F] hover:bg-[#01B14F]"
                            onClick={() => {}}
                          >
                            <Link
                              to={`/ownerstoreorderlist/${item.bill_id}`}
                              className="object-cover h-full bg-center rounded-lg max-h-[120px] max-w-[120px] md:max-w-full md:w-full md:max-h-[180px] lg:max-h-[120px] xl:max-h-[150px]"
                            >
                              ดูออร์เดอร์
                            </Link>
                          </Button>
                        </div>
                        <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex flex-col items-center justify-center mb-[4px] overflow-hidden">
                          {regisDay}/{regisMonth}/{regisYear}
                        </div>
                        <div className=" min-w-[100px] h-[100px] font-bold bg-slate-200 text-[12px] px-[5px] flex items-center justify-center mb-[4px] text-center ">
                          {item.restaurant_name}
                        </div>
                        <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                          {item.last_price}
                        </div>
                        <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                          {item.paymethod}
                        </div>
                        <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] text-center flex flex-col items-center justify-center mb-[4px]">
                          <span>latitude :{item.user_latitude}</span>
                          <span>longitude :{item.user_longitude}</span>
                        </div>
                        <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                          {item.userPhone}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {storeOrderList == "คุณยังไม่มีร้านค้า" && (
        <div className="text-[32px] font-bold w-full flex justify-center mt-[48px]">
          คุณยังไม่มีร้านค้า
        </div>
      )}
    </div>
  );
};

export default OwnerStoreOrderList;
