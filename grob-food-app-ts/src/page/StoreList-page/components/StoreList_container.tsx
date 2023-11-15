import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { GROBFOOD_USER_URL } from "../../../util/constants/constant";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Link } from "react-router-dom";
const StoreList_container = () => {
  const [allstoreList, setAllStoreList] = useState([]);
  const [resMenus, setResMenus] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(allstoreList);
  const handleFilter = (e) => {
    const value = e.target.value;
    console.log(value);
    console.log(allstoreList);
    console.log(filteredUsers, "FILTER");

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
      setAllStoreList(response.data.data);
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
    <div className="mt-[0px]">
      <div className="bg-white mb-[10px] py-[10px] px-[10px] lg:px-[80px] xl:px-[120px]">
        <div className=" flex items-center bg-[#F7F7F7] rounded-[24px] h-[40px] pl-[24px] mb-[16px]">
          <SearchIcon className="text-[#676767]" />
          <input
            type="text"
            placeholder="ค้นหาร้านอาหาร"
            onChange={handleFilter}
            className=" bg-[#F7F7F7] ml-[10px]"
          />
        </div>
        <div className="flex flex-row overflow-auto gap-5 my-[26px] ">
          <div className="w-[135px] h-[85px] bg-[url('/image/catagory-image/ชานมไข่มุก.webp')] rounded-lg flex justify-center items-center">
            <img
              src="/image/catagory-image/ชานมไข่มุก.webp"
              className="  bg-cover rounded-lg"
              alt=""
            />
          </div>
          <div className="w-[135px] h-[85px] bg-[url('/image/catagory-image/ชานมไข่มุก.webp')] rounded-lg flex justify-center items-center">
            <img
              src="/image/catagory-image/ชานมไข่มุก.webp"
              className="  bg-cover rounded-lg"
              alt=""
            />
          </div>
          <div className="w-[135px] h-[85px] bg-[url('/image/catagory-image/ชานมไข่มุก.webp')] rounded-lg flex justify-center items-center">
            <img
              src="/image/catagory-image/ชานมไข่มุก.webp"
              className="  bg-cover rounded-lg"
              alt=""
            />
          </div>
          <div className="w-[135px] h-[85px] bg-[url('/image/catagory-image/ชานมไข่มุก.webp')] rounded-lg flex justify-center items-center">
            <img
              src="/image/catagory-image/ชานมไข่มุก.webp"
              className="  bg-cover rounded-lg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="bg-white px-[10px] md:px-[30px] pt-[50px]  ">
        <div className="md:pl-[24px] lg:px-[30px] xl:px-[120px]">
          <Link to={"/home"}>
            <span className="text-[#4ca3b3] cursor-pointer">บ้าน</span>
          </Link>
          <ArrowForwardIosIcon className="text-[16px]" />{" "}
          <Link to={"/allstore"}>
            <span className="text-[black]">ร้านทั้งหมด</span>
          </Link>
        </div>
        <div className="mb-[20px] text-[20px] font-[500] md:text-[36px] md:pl-[24px] lg:px-[30px] xl:px-[120px]">
          ร้านค้าทั้งหมด
        </div>
        <div className="flex flex-col md:flex-row md:flex-wrap md:w-full md:px-[10px]  justify-center lg:px-[30px] xl:px-[120px]">
          {filteredUsers?.map((item) => {
            return (
              <div
                key={item.restaurant_id}
                className="flex gap-1 items-center justify-items-center mb-[20px] md:mb-[40px]  md:w-[50%] lg:w-[25%] md:px-[8px] lg:items-start"
              >
                <div className="w-full h-[auto] mx-[3px] flex md:flex-col items-center mb-[4px] rounded-lg  gap-[15px]">
                  <div className=" w-[120px] md:w-full h-[120px] md:h-[180px] lg:max-h-[120px] xl:max-h-[150px] flex justify-center items-center bg-cover">
                    <Link
                      to={`/allstore/${item.restaurant_id}`}
                      className="object-cover h-full bg-center rounded-lg max-h-[120px] max-w-[120px] md:max-w-full md:w-full md:max-h-[180px] lg:max-h-[120px] xl:max-h-[150px]"
                    >
                      <img
                        className="object-cover h-full bg-center rounded-lg max-h-[120px] max-w-[120px] md:max-w-full md:w-full md:max-h-[180px] lg:max-h-[120px] xl:max-h-[150px]"
                        src={`data:image/png;base64,${item.restaurants_image_url}`}
                        alt="menu-image"
                        onClick={() => {
                          const i = item.restaurants_image_url;
                          console.log(",", i);
                        }}
                      />
                    </Link>
                  </div>
                  <div className="flex justify-start w-full">
                    <div className="flex flex-col h-[auto]">
                      <div className="font-semibold mb-[10px] text-[14px] md:text-[18px]">
                        {item.restaurant_name}
                      </div>
                      <div className="text-[12px] text-[#505050] font-semibold md:text-[16px]">
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoreList_container;
