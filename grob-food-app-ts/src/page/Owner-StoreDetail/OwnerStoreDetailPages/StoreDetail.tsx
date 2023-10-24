import axios from "axios";
import React, { useEffect, useState } from "react";
import { GROBFOOD_USER_URL } from "../../../util/constants/constant";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const StoreDetail = () => {
  const [page, setPage] = useState("detail");
  const [state, setState] = useState("detail");
  const [addMenuState, setAddMenuState] = useState(false);
  const [onStore, setOnStore] = useState("contrast-100 text-[#009C49]");
  const [onMenus, setOnMenus] = useState("contrast-50 text-[#676767]");

  //STORE CONTAIN
  const [storeDetail, setStoreDetail] = useState<object>({});
  //OWNER
  const getOwner = localStorage.getItem("user");
  const ownerInfo = JSON.parse(getOwner);
  const owner_id = ownerInfo.id;
  const dataOwner: any = {
    owner_id: owner_id,
  };
  //SET STORE DETAILS
  const setNewStoreDetail = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/updatestore`, data);
    if (response.data.success) {
      console.log(response.data.success, "new");

      console.log("Update already");
    } else {
      console.log("Error");
    }
  };
  //ADD NEW TOPIC
  const addNewTopic = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/addtopic`, data);
    if (response.data.success) {
      console.log(response.data.success, "new");

      console.log("Add new topic already");
    } else {
      console.log("Errorr");
    }
  };
  //STORE DETAIL
  const [restaurant_id, setRestaurantID] = useState("");
  const [restaurant_name, setRestaurant_name] = useState("");
  const [address, setRestaurant_address] = useState("");
  const [restaurant_catagory, setRestaurant_catagory] = useState("");
  const [open_time, setRestaurant_openTime] = useState("");
  const [close_time, setRestaurant_closeTime] = useState("");
  //SEND TOPIC
  const [restaurant_topic_name, setRestaurant_topic_name] = useState("");
  //GET TOPIC
  const [resTopicArray, setResTopicArray] = useState([]);
  useEffect(() => {
    const getStoreDetail = async (data: any) => {
      const response = await axios.post(
        `${GROBFOOD_USER_URL}/getownerstore`,
        data
      );
      if (response.data.success) {
        setStoreDetail(response.data.data[0]);
        setRestaurantID(response.data.data[0].restaurant_id);
      } else {
        console.log("err");
      }
    };
    getStoreDetail(dataOwner);
  }, []);
  console.log(storeDetail);

  useEffect(() => {
    const getStoreTopic = async (data: any) => {
      const response = await axios.post(
        `${GROBFOOD_USER_URL}/getstoretopic`,
        data
      );

      if (response.data.success) {
        setResTopicArray(response.data.data);
      } else {
        console.log("err");
      }
    };
    getStoreTopic(dataOwner);
  }, []);

  console.log(resTopicArray);
  const arrayDataItems = resTopicArray.map((course) => <li>{course}</li>);
  console.log(arrayDataItems);

  return (
    <div className="flex flex-col justify-center items-center mx-6 mt-7 rounded-lg">
      <div className="flex items-center w-[80%] lg:max-w-[500px] ">
        <div
          className={
            "flex justify-center w-[100%] h-[auto] text-[14px] md:text-[16px] lg:md:text-[20px] bg-[white] rounded-t-xl  p-3 " +
            onStore
          }
          onClick={() => {
            setOnStore("contrast-100 text-[#009C49]");
            setOnMenus("contrast-50 text-[#676767]");
            setPage("detail");
          }}
        >
          ข้อมูลร้านค้า
        </div>
        <div
          className={
            "flex justify-center w-[100%] h-[auto] text-[14px] md:text-[16px] lg:md:text-[20px] bg-white rounded-t-xl p-3 " +
            onMenus
          }
          onClick={() => {
            setOnStore("contrast-50 text-[#676767]");
            setOnMenus("contrast-100 text-[#009C49]");
            setPage("menus");
          }}
        >
          รายการอาหาร
        </div>
      </div>
      {page == "detail" && (
        <div className="bg-white w-[95%] lg:max-w-[800px] px-[10%] rounded-lg shadow-xl">
          <div className="flex justify-center mb-[40px] mt-[20px] text-[20px] font-bold">
            ข้อมูลร้านค้า
          </div>
          <div>
            <div>
              <div className="mb-[20px]">
                <div className="text-[18px] font-semibold mb-[5px]">
                  ชื่อร้าน
                </div>
                {state == "detail" && (
                  <div className="border-[#0DA152] border-2 rounded-md px-[14px] py-[8.5px] h-[40px] flex items-center">
                    {storeDetail.restaurant_name}
                  </div>
                )}
                {state == "edit" && (
                  <TextField
                    label=""
                    color="success"
                    className=" bg-slate-200 w-full h-[40px]"
                    focused
                    size="small"
                    value={restaurant_name}
                    onChange={(v) => {
                      setRestaurant_name(v.target.value);
                    }}
                  />
                )}
              </div>
              <div className="mb-[20px]">
                <div className="text-[18px] font-semibold mb-[5px]">
                  ที่อยู่
                </div>
                {state == "detail" && (
                  <div className="border-[#0DA152] border-2 rounded-md px-[14px] py-[8.5px] h-[40px] flex items-center">
                    {storeDetail.address}
                  </div>
                )}
                {state == "edit" && (
                  <TextField
                    label=""
                    color="success"
                    className=" bg-slate-200 w-full h-[40px]"
                    focused
                    size="small"
                    value={address}
                    onChange={(v) => {
                      setRestaurant_address(v.target.value);
                    }}
                  />
                )}
              </div>
              <div className="mb-[20px]">
                <div className="text-[18px] font-semibold mb-[5px]">
                  ประเภทของร้านของคุณ
                </div>
                {state == "detail" && (
                  <div className="border-[#0DA152] border-2 rounded-md px-[14px] py-[8.5px] h-[40px] flex items-center">
                    {storeDetail.restaurant_catagory}
                  </div>
                )}
                {state == "edit" && (
                  <TextField
                    label=""
                    color="success"
                    className=" bg-slate-200 w-full h-[40px]"
                    focused
                    size="small"
                    value={restaurant_catagory}
                    onChange={(v) => {
                      setRestaurant_catagory(v.target.value);
                    }}
                  />
                )}
              </div>
              <div className="mb-[20px]">
                <div className="text-[18px] font-semibold mb-[5px]">
                  เวลาเปิดร้าน
                </div>
                {state == "detail" && (
                  <div className="border-[#0DA152] border-2 rounded-md px-[14px] py-[8.5px] h-[40px] flex items-center">
                    {storeDetail.open_time} น.
                  </div>
                )}
                {state == "edit" && (
                  <TextField
                    id="time"
                    label=""
                    type="time"
                    defaultValue="07:30"
                    className="w-full h-[40px]"
                    onChange={(v) => {
                      setRestaurant_openTime(v.target.value);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                )}
              </div>
              <div className="mb-[20px]">
                <div className="text-[18px] font-semibold mb-[5px]">
                  เวลาปิดร้าน
                </div>
                {state == "detail" && (
                  <div className="border-[#0DA152] border-2 rounded-md px-[14px] py-[8.5px] h-[40px] flex items-center">
                    {storeDetail.close_time} น.
                  </div>
                )}
                {state == "edit" && (
                  <TextField
                    id="time"
                    label=""
                    type="time"
                    defaultValue="07:30"
                    className="w-full h-[40px]"
                    onChange={(v) => {
                      setRestaurant_closeTime(v.target.value);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                )}
              </div>
              <div className="text-[12px] text-[#999999]">
                อัปเดทข้อมูลล่าสุด : <span>{storeDetail.update_date}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center my-[20px]">
            {state == "detail" && (
              <Button
                variant="contained"
                onClick={() => {
                  setState("edit");
                }}
                className="bg-[#01B14F] md:min-w-[200px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F]"
              >
                แก้ไขข้อมูล
              </Button>
            )}
            {state == "edit" && (
              <div>
                <Button
                  variant="contained"
                  onClick={() => {
                    setNewStoreDetail({
                      owner_id,
                      restaurant_name,
                      address,
                      open_time,
                      close_time,
                      restaurant_catagory,
                      restaurant_id,
                    });
                    setState("detail");
                  }}
                  className="bg-[#01B14F] md:min-w-[200px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F] mx-[10px]"
                >
                  ยืนยัน
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setState("detail");
                    setRestaurant_name("");
                    setRestaurant_address("");
                    setRestaurant_catagory("");
                    setRestaurant_openTime("");
                  }}
                  className="bg-[#01B14F] md:min-w-[200px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F]"
                >
                  ยกเลิก
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {page == "menus" && (
        <div className="bg-white w-[95%] lg:max-w-[1000px] px-[5%] rounded-lg shadow-xl">
          <div className="flex justify-center mb-[40px] mt-[20px] text-[20px] font-bold">
            เมนู
          </div>
          {addMenuState == true && (
            <div className="absolute w-[95%] md:w-[400px] h-[200px] bg-[white] left-[50%] translate-x-[-50%] drop-shadow-xl shadow-2xl border-2 rounded-lg z-10">
              <div className="flex justify-center font-bold text-[18px] mt-[15px]">
                เพิ่มรายการหมวดหมู่
              </div>
              <div className="flex justify-center flex-col items-center my-[20px]">
                <div className="text-[16px] font-semibold">ชื่อหมวดหมู่</div>
                <TextField
                  label=""
                  color="success"
                  className=" bg-slate-200 w-[80%] h-[40px]"
                  focused
                  size="small"
                  value={restaurant_topic_name}
                  onChange={(v) => {
                    setRestaurant_topic_name(v.target.value);
                  }}
                />
              </div>
              <div className="flex w-[100%] justify-center">
                <Button
                  variant="contained"
                  className="bg-[#01B14F] md:min-w-[100px] max-w-[200px] focus:bg-[#01b14f] hover:bg-[#01B14F] mx-[10px]"
                  onClick={() => {
                    addNewTopic({ restaurant_id, restaurant_topic_name });
                    setAddMenuState(false);
                    setRestaurant_topic_name("");
                  }}
                >
                  ยืนยัน
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    setAddMenuState(false);
                  }}
                  className="bg-[#01B14F] md:min-w-[100px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F] mx-[10px]"
                >
                  ยกเลิก
                </Button>
              </div>
            </div>
          )}
          <div className="flex justify-start my-[20px]">
            <Button
              variant="contained"
              className="bg-[#01B14F] md:min-w-[200px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F] z-0"
              onClick={() => {
                setAddMenuState(true);
              }}
            >
              เพิ่มหมวดหมู่
              <AddIcon className="text-[18px]" />
            </Button>
          </div>
          <div className="">
            {resTopicArray?.map((item) => {
              return (
                <div className="flex justify-between p-[20px] border-2 rounded-lg mb-[10px]">
                  <div className="flex justify-center items-center font-bold text-[18px]">
                    {item.restaurant_topic_name}
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      className="bg-[#01B14F] md:min-w-[200px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F]"
                    >
                      เพิ่มเมนู
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreDetail;
