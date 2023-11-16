import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { GROBFOOD_USER_URL } from "../../../util/constants/constant";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";
import { Link } from "react-router-dom";
const StoreList_container = () => {
  const [allstoreList, setAllStoreList] = useState([]);
  const [resMenus, setResMenus] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(allstoreList);
  const [userLatitude, setUserLatitude] = useState("");
  const [userLongitude, setUserLongitude] = useState("");
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
  function getDistanceBetweenPointsNew(
    latitude1,
    longitude1,
    latitude2,
    longitude2,
    unit = "kilometers"
  ) {
    const theta = longitude1 - longitude2;
    let distance =
      Math.sin(deg2rad(latitude1)) * Math.sin(deg2rad(latitude2)) +
      Math.cos(deg2rad(latitude1)) *
        Math.cos(deg2rad(latitude2)) *
        Math.cos(deg2rad(theta));
    distance = Math.acos(distance);
    distance = rad2deg(distance);
    distance = distance * 60 * 1.1515;
    if (unit === "kilometers") {
      distance *= 1.609344;
    }
    return distance.toFixed(1);
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  function rad2deg(rad) {
    return rad * (180 / Math.PI);
  }
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
  const getLoaction = localStorage.getItem("location");
  let user_location = JSON.parse(getLoaction);

  // const getUserlocation = () => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     setUserLatitude(position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);
  //     setUserLongitude(position.coords.longitude);
  //   });
  // };
  useEffect(() => {
    getStore();
    if (user_location) {
      setUserLatitude(user_location.latitude);
      setUserLongitude(user_location.longitude);
    }
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
            let haveLocation = false;
            let distance;
            let time;
            let timeHr;
            let timeMin;
            console.log(userLatitude);

            if (item.latitude != null && userLatitude != "") {
              haveLocation = true;
              distance = getDistanceBetweenPointsNew(
                item.latitude,
                item.longitude,
                userLatitude,
                userLongitude
              );
              time = distance / 80;
              timeMin = (10 + time * 60).toFixed(0);
            }

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

                      <div className="flex flex-col md:flex-row">
                        <div className=" flex  justify-start items-center text-[12px] text-[#505050] font-semibold mr-[12px]">
                          <StarIcon className="text-[20px] text-[#F7C942]" />{" "}
                          <span className="flex flex-col content-center item justify-center items-center text-[14px]">
                            {item.score}
                          </span>
                        </div>

                        {haveLocation && (
                          <div className="flex">
                            <div className="text-[14px] flex justify-center items-center text-[#7a7a7a]">
                              <AccessTimeIcon className="text-[20px] mr-[3px] flex justify-center items-center" />
                              {timeMin} นาที
                            </div>

                            <div className="text-[14px] flex justify-center items-center text-[#7a7a7a]">
                              &nbsp;&nbsp;•&nbsp;&nbsp;
                            </div>

                            <div className="text-[14px] flex justify-center items-center text-[#7a7a7a]">
                              {distance} km.
                            </div>
                          </div>
                        )}
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
