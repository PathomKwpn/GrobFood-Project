import React from "react";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
import { Link, useParams } from "react-router-dom";
import { Navbarauth } from "../Home/components";
import axios from "axios";
import Login from "../Login-pages/Login";
import Footer from "../Footer/Footer";
const StorePage = ({ clearToken }) => {
  //CHECK LOGIN
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }
  const { resid } = useParams();
  const restaurant_id = { restaurant_id: resid };
  const [storeDetail, setStoreDetail] = useState([]);
  const [storeTopic, setStoreTopic] = useState([]);
  const [menus, setMenus] = useState([]);
  const getStoreDetailAPI = async () => {
    console.log();
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getstoredetail`,
      restaurant_id
    );
    if (response.data.success) {
      console.log(response.data.data);

      setStoreDetail(response.data.data);
      setStoreTopic(response.data.topic);
      console.log(storeDetail);

      console.log("api success");
    } else {
      console.log("err");
    }
  };

  useEffect(() => {
    getStoreDetailAPI();
  }, []);
  return (
    <div className=" bg-[#F7F7F7]">
      <Navbarauth clearToken={clearToken} />

      {storeDetail.length !== 0 && (
        <div className="">
          {/* Detail */}
          <div className=" bg-white lg:pt-[20px] lg:px-[10%] ">
            <div className="w-full flex items-center justify-center mb-[4px] rounded-l-lg md:hidden">
              <img
                className="bg-cover w-full"
                src={`data:image/png;base64,${storeDetail[0].restaurants_image_url}`}
                alt="menu-image"
              />
            </div>
            <div className="mx-[12px] mt-[24px]">
              <div>
                <span className="text-[#4ca3b3]">บ้าน</span>{" "}
                <ArrowForwardIosIcon className="text-[16px]" />{" "}
                <Link to={"/allstore"}>
                  <span className="text-[#4ca3b3]">ร้านทั้งหมด</span>
                </Link>
                <ArrowForwardIosIcon className="text-[16px]" />{" "}
                <span className="text-[#1c1c1c]">
                  {storeDetail[0].restaurant_name}
                </span>
              </div>
              <div className="text-[24px] lg:text-[36px] font-[500] mb-[10px]">
                {storeDetail[0].restaurant_name}
              </div>
              <div className="text-[#676767] text-[14px] my-[6px]">
                {storeDetail[0].restaurant_catagory}
              </div>
              <div className="flex items-center text-[12px] text-[#505050] my-[6px]">
                <StarIcon className="text-[18px] text-[#F7C942] mr-[10px]" />{" "}
                <span className="text-[14px] font-[300]">
                  {storeDetail[0].score}
                </span>
              </div>
              <div className="text-[14px] text-[#505050] font-[400] pb-[10px]">
                <span className="mr-[36px] font-[500]">
                  เวลาเปิดให้บริการ :
                </span>{" "}
                {storeDetail[0].open_time} - {storeDetail[0].close_time}
              </div>
            </div>
          </div>
          {/* MenuList */}
          <div className="lg:px-[10%]">
            {storeTopic?.map((item) => {
              let topic_name = item.restaurant_topic_name;
              return (
                <div
                  key={item.restaurant_topic_name}
                  className="flex flex-col gap-1  my-[10px] bg-white lg:bg-[#F7F7F7] bg pt-[20px] px-[10px] lg:px-[0px] md:px-[36px] "
                >
                  <span className="text-[20px] lg:text-[28px] font-[500] mb-[24px]">
                    {item.restaurant_topic_name}
                  </span>
                  <div className="flex flex-col lg:flex-row">
                    {storeDetail?.map((item) => {
                      if (item.restaurant_topic_name == topic_name) {
                        return (
                          <div
                            key={item.menu_name}
                            className="flex gap-1 items-center justify-items-center mb-[20px] pb-[12px] h-[100%] border-b-[1px] lg:w-[300px] lg:bg-white lg:p-[10px] lg:rounded-lg lg:mr-[15px]"
                          >
                            <div className="w-[97px] h-[97px] md:w-[130px] md:h-[130px]  rounded-md flex-0.5">
                              <img
                                className="bg-cover w-full"
                                src={`data:image/png;base64,${item.menu_image_url}`}
                                alt="menu-image"
                              />
                            </div>
                            <div className="flex flex-col h-[97px] w-[100%] justify-between flex-1">
                              <div className="text-[16px] font-[300] text-[#1c1c1c]">
                                {item.menu_name}
                              </div>
                              <div className="w-full flex justify-between">
                                <div className="text-[18px] text-[#1c1c1c] font-[500]">
                                  {item.price}
                                </div>
                                <div className="w-[32px] h-[32px] rounded-[50%] bg-[#00B14F] flex justify-center items-center">
                                  <AddIcon className="text-[white]" />
                                </div>
                              </div>
                            </div>

                            {/* {menus.length !== 0 && <div>{menus[0].menu_name}</div>} */}
                          </div>
                        );
                      }
                    })}
                  </div>
                  {/* {menus.length !== 0 && <div>{menus[0].menu_name}</div>} */}
                </div>
              );
            })}
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default StorePage;
