import { useEffect, useState } from "react";

import { NavbarDriver, Container } from "./components/index";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
import axios from "axios";
import Login from "../Login-pages/Login";

const DriverHome = () => {
  const getDriver: any = localStorage.getItem("user");
  if (!getDriver) {
    return <Login />;
  }
  const user_info = JSON.parse(getDriver);
  const driver_id = user_info.id;
  const sendDriver_id = { driver_id: driver_id };
  //STATE
  //ORDER LIST
  const [orderList, setOrderList] = useState([]);
  const [driverWorkList, setDriverWorkList] = useState([]);
  const [DriverBillStatus, setDriverBillStatus] = useState("");
  const getOrderFindDriver = async () => {
    const response = await axios.get(`${GROBFOOD_USER_URL}/getorderfinddriver`);

    if (response.data.success) {
      setOrderList(response.data.data);
    } else {
      console.log("ERROR");
    }
  };
  const driverAcceptWork = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/driveracceptwork`,
      data
    );

    if (response.data.success) {
      console.log("accept success");
    } else {
      console.log("ERROR");
    }
  };
  const getDriverWorkList = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getdriverworklist`,
      data
    );

    if (response.data.success) {
      console.log(response.data.data);
      setDriverBillStatus(response.data.data[0].bill_status);
      setDriverWorkList(response.data.data);
      console.log("get driver work list accept success");
    } else {
      console.log("ERROR");
    }
  };
  useEffect(() => {
    getOrderFindDriver();
    getDriverWorkList(sendDriver_id);
  }, []);

  // const getOrderFindDriver = async () => {
  //   const response = await axios.get(`${GROBFOOD_USER_URL}/getuserorderlist`);
  //   if (response.data.success) {
  //     console.log("get cart already");
  //     console.log(response.data.data);
  //   } else {
  //     console.log("Error");
  //   }
  // };
  // useEffect(() => {
  //   getOrderFindDriver();
  // });
  return (
    <div className=" bg-slate-200 min-h-[100vh]">
      <NavbarDriver />
      <Container
        orderList={orderList}
        driverWorkList={driverWorkList}
        driverAcceptWork={driverAcceptWork}
        driver_id={driver_id}
        DriverBillStatus={DriverBillStatus}
      />
    </div>
  );
};

export default DriverHome;
