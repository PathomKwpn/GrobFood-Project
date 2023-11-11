import SearchStoreBar from "./SearchStorebar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { GROBFOOD_USER_URL } from "../../../util/constants/constant";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { Link } from "react-router-dom";
const StoreList_container = () => {
  const [allstoreList, setAllStoreList] = useState([]);
  const [resMenus, setResMenus] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(allstoreList);
  const handleFilter = (e) => {
    const value = e.target.value;
    const filtered = allstoreList.filter((store) =>
      store.restaurant_name.includes(value)
    );
    setFilteredUsers(filtered);
  };
  const getStore = async () => {
    console.log();
    const response = await axios.post(`${GROBFOOD_USER_URL}/getallstorelist`);
    if (response.data.success) {
      setResMenus(response.data.data[0]);
      console.log(resMenus, "res");

      console.log(response.data.data);
      setFilteredUsers(response.data.data);
      console.log(allstoreList, "all");
      console.log(filteredUsers, "fill");
    } else {
      console.log("err");
    }
  };
  useEffect(() => {
    getStore();
  }, []);
  return (
    <div className="mx-[10px] mt-[100px]">
      <SearchStoreBar />
      <div>
        <div>ร้านค้าโปรโมชั่น</div>
        <div>dqw</div>
      </div>
      <div>
        <span className="text-[#4ca3b3]">บ้าน</span>{" "}
        <ArrowForwardIosIcon className="text-[16px]" /> <span>ร้านทั้งหมด</span>
      </div>
      <div>
        <div className="mb-[20px] text-[20px] font-[500]">ร้านค้าทั้งหมด</div>
        <div>
          <input type="text" onChange={handleFilter} />
          {filteredUsers?.map((item) => {
            return (
              <div
                key={item.restaurant_id}
                className="flex gap-1 items-center justify-items-center mb-[20px]"
              >
                <div className="w-full h-[auto] mx-[3px] flex items-center mb-[4px] rounded-lg  gap-[15px]">
                  <div className=" w-[120px] h-[120px] flex justify-center items-center bg-cover">
                    <Link
                      to={`/allstore/${item.restaurant_id}`}
                      className="object-cover h-full bg-center rounded-lg max-h-[120px] max-w-[120px]"
                    >
                      <img
                        className="object-cover h-full bg-center rounded-lg max-h-[120px] max-w-[120px]"
                        src={`data:image/png;base64,${item.restaurants_image_url}`}
                        alt="menu-image"
                        onClick={() => {
                          const i = item.restaurants_image_url;
                          console.log(",", i);
                        }}
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col h-[auto]">
                    <div className="font-semibold mb-[10px] text-[14px]">
                      {item.restaurant_name}
                    </div>
                    <div className="text-[12px] text-[#505050] font-semibold">
                      เวลาให้บริการ : {item.open_time} - {item.close_time}
                    </div>
                    <div className="text-[12px] text-[#7a7a7a] mb-[5px]">
                      {item.restaurant_catagory}
                    </div>

                    <div className="text-[12px] text-[#505050] font-semibold">
                      <StarIcon className="text-[20px] text-[#F7C942]" />{" "}
                      {item.score}
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
