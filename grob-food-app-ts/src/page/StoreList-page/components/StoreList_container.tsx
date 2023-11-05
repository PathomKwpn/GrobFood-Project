import SearchStoreBar from "./SearchStorebar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { GROBFOOD_USER_URL } from "../../../util/constants/constant";
import axios from "axios";
const StoreList_container = () => {
  const [allstoreList, setAllStoreList] = useState([]);

  const [resMenus, setResMenus] = useState([]);
  const getStore = async () => {
    console.log();
    const response = await axios.post(`${GROBFOOD_USER_URL}/getallstorelist`);
    if (response.data.success) {
      setResMenus(response.data.data[0]);
      console.log(resMenus, "res");

      console.log(response.data.data);
      setAllStoreList(response.data.data);
      console.log(allstoreList, "all");
    } else {
      console.log("err");
    }
  };
  useEffect(() => {
    getStore();
  }, []);
  return (
    <div className="">
      <SearchStoreBar />
      <div>
        <span className="text-[#4ca3b3]">บ้าน</span>{" "}
        <ArrowForwardIosIcon className="text-[16px]" /> <span>ร้านทั้งหมด</span>
      </div>
      <div>
        <div>ร้านค้าโปรโมชั่น</div>
        <div>dqw</div>
      </div>
      <div>
        <div className="mb-[40px]">ร้านค้าทั้งหมด</div>
        <div>
          {allstoreList?.map((item) => {
            return (
              <div
                key={item.restaurant_id}
                className="flex gap-1 items-center justify-items-center mx-[10px] mb-[20px]"
              >
                <div className="w-full  mx-[3px] flex   mb-[4px] rounded-lg max-h-[100px] overflow-hidden gap-[15px]">
                  <div className=" w-[100px] h-[100px] flex justify-center items-center bg-cover">
                    <img
                      className="bg-cover h-full bg-center rounded-lg max-h-[100px]"
                      src={`data:image/png;base64,${item.restaurants_image_url}`}
                      alt="menu-image"
                      onClick={() => {
                        const i = item.restaurants_image_url;
                        console.log(",", i);
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-semibold mb-[10px] text-[16px]">
                      {item.restaurant_name}
                    </div>
                    <div className="text-[12px] text-[#7a7a7a]">
                      {item.restaurant_catagory}
                    </div>
                    <div className="text-[14px] text-[#000000]">
                      เปิด: {item.open_time} ปิด: {item.close_time}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>footer</div>
    </div>
  );
};

export default StoreList_container;
