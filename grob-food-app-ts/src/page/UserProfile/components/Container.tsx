import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { GROBFOOD_USER_URL } from "../../../util/constants/constant";
import axios from "axios";

const Container = () => {
  const [state, setState] = useState("detail");
  //GET USER ID FROM LOCALSTORAGE
  const getUser: any = localStorage.getItem("user");
  const user_info = JSON.parse(getUser);
  const user_id = user_info.id;
  const user_idObject: any = {
    user_id: user_id,
  };
  //USER INFO
  const [user_firstname, setUserfirstName] = useState("");
  const [user_lastname, setUserlastName] = useState("");
  const [user_age, setUserAge] = useState("");
  const [user_phone, setUserphone] = useState("");
  const [updateDate, setUpdateDate] = useState("");

  //GET USER INFO
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [update, setUpdate] = useState("");
  const getUserDetail = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getuserdetail`,
      data
    );
    console.log(data);
    const userData = response.data.data[0];
    console.log("getUser");

    if (response.data.success) {
      console.log(response.data.data);
      setFirstName(userData.user_firstname);
      setLastName(userData.user_lastname);
      setAge(userData.user_age);
      setPhone(userData.user_phone);
      setUpdate(userData.update_date);
    } else {
      console.log("err");
    }
  };
  useEffect(() => {
    getUserDetail(user_idObject);
  }, []);
  //SET NEW USER DETAILS
  const setNewUserDetail = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/updateuser`, data);
    if (response.data.success) {
      console.log(response.data.success, "new");
      getUserDetail(user_idObject);
      console.log("Update already");
    } else {
      console.log("Error");
    }
  };
  return (
    <div className="flex flex-col items-center w-[95%] max-w-[600px] h-[auto] bg-white m-auto mt-[50px] rounded-xl">
      <div className="text-[24px] font-bold content-center items-center mt-[40px] mb-[30px]">
        ข้อมูลผู้ใช้
      </div>
      <div className="mb-[20px] w-[90%]">
        <div className="text-[18px] font-semibold mb-[5px]">ชื่อผู้ใช้</div>
        {state == "detail" && (
          <div className="border-[#0DA152] border-2 rounded-md px-[14px] py-[8.5px] h-[40px] flex items-center">
            {firstName}
          </div>
        )}
        {state == "edit" && (
          <TextField
            label=""
            color="success"
            className=" bg-slate-200 w-full h-[40px]"
            focused
            size="small"
            value={user_firstname}
            onChange={(v) => {
              setUserfirstName(v.target.value);
            }}
          />
        )}
      </div>
      <div className="mb-[20px] w-[90%]">
        <div className="text-[18px] font-semibold mb-[5px]">นามสกุล</div>
        {state == "detail" && (
          <div className="border-[#0DA152] border-2 rounded-md px-[14px] py-[8.5px] h-[40px] flex items-center">
            {lastName}
          </div>
        )}
        {state == "edit" && (
          <TextField
            label=""
            color="success"
            className=" bg-slate-200 w-full h-[40px]"
            focused
            size="small"
            value={user_lastname}
            onChange={(v) => {
              setUserlastName(v.target.value);
            }}
          />
        )}
      </div>
      <div className="mb-[20px] w-[90%]">
        <div className="text-[18px] font-semibold mb-[5px]">อายุ</div>
        {state == "detail" && (
          <div className="border-[#0DA152] border-2 rounded-md px-[14px] py-[8.5px] h-[40px] flex items-center">
            {age}
          </div>
        )}
        {state == "edit" && (
          <TextField
            label=""
            color="success"
            className=" bg-slate-200 w-full h-[40px]"
            focused
            type="number"
            size="small"
            value={user_age}
            onChange={(v) => {
              setUserAge(v.target.value);
            }}
          />
        )}
      </div>
      <div className="mb-[20px] w-[90%]">
        <div className="text-[18px] font-semibold mb-[5px]">เบอร์โทรศัพท์</div>
        {state == "detail" && (
          <div className="border-[#0DA152] border-2 rounded-md px-[14px] py-[8.5px] h-[40px] flex items-center">
            {phone}
          </div>
        )}
        {state == "edit" && (
          <TextField
            label=""
            color="success"
            className=" bg-slate-200 w-full h-[40px]"
            focused
            size="small"
            value={user_phone}
            onChange={(v) => {
              setUserphone(v.target.value);
            }}
          />
        )}
      </div>
      <div className="text-[12px] text-[#999999]">
        อัปเดทข้อมูลล่าสุด : <span>{update}</span>
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
                setNewUserDetail({
                  user_firstname,
                  user_lastname,
                  user_age,
                  user_phone,
                  updateDate,
                  user_id,
                });
                setUserfirstName("");
                setUserlastName("");
                setUpdateDate("");
                setUserphone("");
                setUserAge("");
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
              }}
              className="bg-[#01B14F] md:min-w-[200px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F]"
            >
              ยกเลิก
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Container;
