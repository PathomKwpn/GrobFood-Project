import axios from "axios";
import Login from "../Login-pages/Login";
import { NavbarDriver } from "./components/index";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";

interface driverProfile {
  driver_id: string;
  driver_firstname: string;
  driver_lastname: string;
  driver_phone: string;
  driver_credit: "0";
  update_date: "2023-10-11T01:12:41.912Z";
}
const DriverProfile = () => {
  const getDriver: any = localStorage.getItem("user");
  if (!getDriver) {
    return <Login />;
  }
  const user_info = JSON.parse(getDriver);
  const driver_id = user_info.id;
  const sendDriver_id = { driver_id: driver_id };
  const [driver, setDriver] = useState<Array<driverProfile>>();

  //STATE
  const [state, setState] = useState<"detail" | "edit">("detail");

  //INFO
  const [driver_firstName, setDriverFirstName] = useState("");
  const [driver_lastName, setDriverLastName] = useState("");
  const [driver_phone, setDriverPhone] = useState("");

  //   const [driver_credit, setDriverCredit] = useState("");
  // const [update_date, setUpdateDate] = useState("");
  const getDriverProfile = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getdriverprofile`,
      data
    );

    if (response.data.success) {
      setDriver(response.data.data);
    } else {
      console.log("ERROR");
    }
  };
  const setNewDriverProfile = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/setnewdriverprofile`,
      data
    );
    if (response.data.success) {
      getDriverProfile(sendDriver_id);
      console.log("Update already");
    } else {
      console.log("Error");
    }
  };
  useEffect(() => {
    getDriverProfile(sendDriver_id);
  }, []);
  return (
    <div className="bg-slate-100 min-h-[100vh]">
      <NavbarDriver />
      {driver && (
        <div className="flex flex-col items-center w-[95%] max-w-[600px] h-[auto] bg-white m-auto mt-[50px] rounded-xl shadow-sm">
          <div className="text-[24px] font-bold content-center items-center mt-[40px] mb-[30px]">
            ข้อมูลผู้ใช้
          </div>
          <div className="mb-[20px] w-[90%]">
            <div className="text-[18px] font-semibold mb-[5px]">ชื่อผู้ใช้</div>
            {state == "detail" && (
              <div className="border-[#0DA152] border-2 rounded-md px-[14px] py-[8.5px] h-[40px] flex items-center">
                {driver[0].driver_firstname}
              </div>
            )}
            {state == "edit" && (
              <TextField
                label=""
                color="success"
                className=" bg-slate-200 w-full h-[40px]"
                focused
                placeholder={driver[0].driver_firstname}
                size="small"
                value={driver_firstName}
                onChange={(v) => {
                  setDriverFirstName(v.target.value);
                }}
              />
            )}
          </div>
          <div className="mb-[20px] w-[90%]">
            <div className="text-[18px] font-semibold mb-[5px]">นามสกุล</div>
            {state == "detail" && (
              <div className="border-[#0DA152] border-2 rounded-md px-[14px] py-[8.5px] h-[40px] flex items-center">
                {driver[0].driver_lastname}
              </div>
            )}
            {state == "edit" && (
              <TextField
                label=""
                color="success"
                className=" bg-slate-200 w-full h-[40px]"
                focused
                placeholder={driver[0].driver_lastname}
                size="small"
                value={driver_lastName}
                onChange={(v) => {
                  setDriverLastName(v.target.value);
                }}
              />
            )}
          </div>

          <div className="mb-[20px] w-[90%]">
            <div className="text-[18px] font-semibold mb-[5px]">
              เบอร์โทรศัพท์
            </div>
            {state == "detail" && (
              <div className="border-[#0DA152] border-2 rounded-md px-[14px] py-[8.5px] h-[40px] flex items-center">
                {driver[0].driver_phone}
              </div>
            )}
            {state == "edit" && (
              <TextField
                label=""
                color="success"
                className=" bg-slate-200 w-full h-[40px]"
                focused
                placeholder={driver[0].driver_phone}
                size="small"
                value={driver_phone}
                onChange={(v) => {
                  setDriverPhone(v.target.value);
                }}
              />
            )}
          </div>
          <div className="text-[12px] text-[#999999]">
            อัปเดทข้อมูลล่าสุด : <span>{driver[0].update_date}</span>
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
                    let data = {
                      driver_firstName,
                      driver_lastName,
                      driver_phone,
                      driver_id: driver[0].driver_id,
                    };
                    console.log(data);
                    setNewDriverProfile(data);
                    setDriverFirstName("");
                    setDriverLastName("");
                    setDriverPhone("");
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
      )}
    </div>
  );
};

export default DriverProfile;
