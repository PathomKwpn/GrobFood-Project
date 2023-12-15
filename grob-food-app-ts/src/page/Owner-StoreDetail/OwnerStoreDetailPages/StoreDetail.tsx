import axios from "axios";

import { useEffect, useState } from "react";
import { GROBFOOD_USER_URL } from "../../../util/constants/constant";
import Button from "@mui/material/Button";

import MenuList from "./MenuList";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

interface storeDetail {
  address: string;
  close_time: string;
  create_by: string;
  create_date: string;
  image_type: string;
  latitude: string;
  longitude: string;
  open_time: string;
  owner_firstname: string;
  owner_id: string;
  owner_lastname: string;
  owner_password: string;
  owner_phone: string;
  owner_username: string;
  regis_date: string;
  restaurant_catagory: string;
  restaurant_credit: number;
  restaurant_id: string;
  restaurant_name: string;
  restaurants_id: string;
  restaurants_image_id: string;
  restaurants_image_url: string;
  score: string;
  status: string;
  update_by: string;
  update_date: string;
}
const StoreDetail = () => {
  const [page, setPage] = useState("detail");
  const [state, setState] = useState("detail");

  const [onStore, setOnStore] = useState("contrast-100 text-[#009C49]");
  const [onMenus, setOnMenus] = useState("contrast-50 text-[#676767]");

  //STORE CONTAIN
  const [storeDetail, setStoreDetail] = useState<storeDetail>();
  //OWNER
  const getOwner: any = localStorage.getItem("user");
  const ownerInfo = JSON.parse(getOwner);
  const owner_id = ownerInfo.id;
  const dataOwner: any = {
    owner_id: owner_id,
  };
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
  //SET STORE DETAILS
  const setNewStoreDetail = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/updatestore`, data);
    if (response.data.success) {
      getStoreDetail(dataOwner);
      console.log("Update already");
    } else {
      console.log("Error");
    }
  };
  //ADD NEW TOPIC

  //STORE DETAIL
  const [restaurant_id, setRestaurantID] = useState("");
  const [restaurant_name, setRestaurant_name] = useState("");
  const [address, setRestaurant_address] = useState("");
  const [restaurant_catagory, setRestaurant_catagory] = useState("");
  const [open_time, setRestaurant_openTime] = useState("");
  const [close_time, setRestaurant_closeTime] = useState("");
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const handleChange = (event: any) => {
    setRestaurant_catagory(event.target.value);
  };
  useEffect(() => {
    getStoreDetail(dataOwner);
  }, []);

  // console.log(resTopicArray);
  // const arrayDataItems = resTopicArray.map((course) => <li>{course}</li>);
  // console.log(arrayDataItems);

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
          <div className="flex justify-center mb-[40px] mt-[20px] text-[20px] font-bold ">
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
                    {storeDetail?.restaurant_name}
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
                    {storeDetail?.address}
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
                  latitude
                </div>
                {state == "detail" && (
                  <div className="border-[#0DA152] border-2 rounded-md px-[14px] py-[8.5px] h-[40px] flex items-center">
                    {storeDetail?.latitude}
                  </div>
                )}
                {state == "edit" && (
                  <TextField
                    label=""
                    color="success"
                    className=" bg-slate-200 w-full h-[40px]"
                    focused
                    size="small"
                    value={latitude}
                    onChange={(v) => {
                      setlatitude(v.target.value);
                    }}
                  />
                )}
              </div>
              <div className="mb-[20px]">
                <div className="text-[18px] font-semibold mb-[5px]">
                  longitude
                </div>
                {state == "detail" && (
                  <div className="border-[#0DA152] border-2 rounded-md px-[14px] py-[8.5px] h-[40px] flex items-center">
                    {storeDetail?.longitude}
                  </div>
                )}
                {state == "edit" && (
                  <TextField
                    label=""
                    color="success"
                    className=" bg-slate-200 w-full h-[40px]"
                    focused
                    size="small"
                    value={longitude}
                    onChange={(v) => {
                      setlongitude(v.target.value);
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
                    {storeDetail?.restaurant_catagory}
                  </div>
                )}
                {state == "edit" && (
                  <FormControl
                    variant="filled"
                    focused
                    color="success"
                    sx={{ minWidth: 200 }}
                    className="w-[100%] focus:text-[green] rounded-lg border-2"
                  >
                    <InputLabel
                      focused
                      className="focus:text-[green] hover:text-[green] "
                    >
                      ประเภทของอาหาร
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={restaurant_catagory}
                      onChange={handleChange}
                      className="focus:text-[green]"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"อาหารตามสั่ง"}>อาหารตามสั่ง</MenuItem>
                      <MenuItem value={"อาหารอีสาน"}>อาหารอีสาน</MenuItem>
                      <MenuItem value={"อาหารเส้น"}>อาหารเส้น</MenuItem>
                      <MenuItem value={"พิซซ่า"}>พิซซ่า</MenuItem>
                      <MenuItem value={"ฟาสต์ฟู๊ด"}>ฟาสต์ฟู๊ด</MenuItem>
                      <MenuItem value={"ไก่ทอด"}>ไก่ทอด</MenuItem>
                      <MenuItem value={"ชา กาแฟ"}>ชา กาแฟ</MenuItem>
                      <MenuItem value={"ชานมไข่มุก"}>ชานมไข่มุก</MenuItem>
                      <MenuItem value={"อาหารทะเล"}>อาหารทะเล</MenuItem>
                      <MenuItem value={"ทานเล่น/ขนมขบเคี้ยว"}>
                        ทานเล่น/ขนมขบเคี้ยว
                      </MenuItem>
                      <MenuItem value={"ข้าวหน้า"}>ข้าวหน้า</MenuItem>
                      <MenuItem value={"เบเกอรี่"}>เบเกอรี่</MenuItem>
                      <MenuItem value={"ยำ"}>ยำ</MenuItem>
                      <MenuItem value={"ผลไม้"}>ผลไม้</MenuItem>
                      <MenuItem value={"ปิ้งย่าง/บาร์บีคิว"}>
                        ปิ้งย่าง/บาร์บีคิว
                      </MenuItem>
                      <MenuItem value={"ข้าวมันไก่"}>ข้าวมันไก่</MenuItem>
                      <MenuItem value={"โยเกิร์ต/ไอศกรีม"}>
                        โยเกิร์ต/ไอศกรีม
                      </MenuItem>
                      <MenuItem value={"น้ำผลไม้/สมูทตี้"}>
                        น้ำผลไม้/สมูทตี้
                      </MenuItem>
                      <MenuItem value={"สเต็ก"}>สเต็ก</MenuItem>
                      <MenuItem value={"อาหารสุขภาพ"}>อาหารสุขภาพ</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </div>
              <div className="mb-[20px]">
                <div className="text-[18px] font-semibold mb-[5px]">
                  เวลาเปิดร้าน
                </div>
                {state == "detail" && (
                  <div className="border-[#0DA152] border-2 rounded-md px-[14px] py-[8.5px] h-[40px] flex items-center">
                    {storeDetail?.open_time} น.
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
                    {storeDetail?.close_time} น.
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
                อัปเดทข้อมูลล่าสุด : <span>{storeDetail?.update_date}</span>
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
                      latitude,
                      longitude,
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
      {page == "menus" && <MenuList restaurant_id={restaurant_id} />}
    </div>
  );
};

export default StoreDetail;
