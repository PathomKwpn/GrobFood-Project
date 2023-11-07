import React from "react";
import { useEffect, useState } from "react";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
import { useParams } from "react-router-dom";

import axios from "axios";
import Login from "../Login-pages/Login";
const StorePage = () => {
  //CHECK LOGIN
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  const { resid } = useParams();
  const restaurant_id = { restaurant_id: resid };
  const [storeDetail, setStoreDetail] = useState([]);
  const getStoreDetailAPI = async () => {
    console.log();
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getstoredetail`,
      restaurant_id
    );
    if (response.data.success) {
      console.log(response.data.data);

      setStoreDetail(response.data.data);
      console.log(storeDetail);

      console.log("api success");
    } else {
      console.log("err");
    }
  };
  useEffect(() => {
    getStoreDetailAPI();
  }, []);
  console.log();
  console.log(resid);
  console.log(storeDetail);

  return (
    <div>
      {storeDetail !== undefined && (
        <div>Hello {storeDetail[0].restaurant_name}</div>
      )}
    </div>
  );
};

export default StorePage;
