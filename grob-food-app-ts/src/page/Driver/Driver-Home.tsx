import React, { useEffect } from "react";
import NavbarDriver from "./components/NavbarDriver";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
import axios from "axios";
const DriverHome = () => {
  const getOrderFindDriver = async () => {
    const response = await axios.get(`${GROBFOOD_USER_URL}/getuserorderlist`);
    if (response.data.success) {
      console.log("get cart already");
      console.log(response.data.data);
    } else {
      console.log("Error");
    }
  };
  useEffect(() => {
    getOrderFindDriver();
  });
  return (
    <div>
      <NavbarDriver />
    </div>
  );
};

export default DriverHome;
