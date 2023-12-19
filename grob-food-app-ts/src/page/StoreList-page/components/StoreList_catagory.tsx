import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../../util/token/token";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
interface allstoreListProps {
  close_time: string;
  latitude: string;
  longitude: string;
  open_time: string;
  restaurant_catagory: string;
  restaurant_id: string;
  restaurant_name: string;
  restaurants_image_url: string;
  score: string;
}
interface StoreCatagoryProps {
  allstoreList: Array<allstoreListProps>;
  filteredUsers: Array<allstoreListProps>;
  setFilteredUsers: React.Dispatch<
    React.SetStateAction<Array<allstoreListProps> | undefined>
  >;
}
const StoreListCatagory = ({
  allstoreList,
  filteredUsers,
  setFilteredUsers,
}: StoreCatagoryProps) => {
  const nevigate = useNavigate();
  const { updateToken } = useToken();
  const [userLatitude, setUserLatitude] = useState("");
  const [userLongitude, setUserLongitude] = useState("");
  const handleFilter = (e: any) => {
    const value = e.target.value;

    const filtered = allstoreList.filter((store: any) =>
      store.restaurant_name.includes(value)
    );

    setFilteredUsers(filtered);
  };

  let restaurant_catagory;
  if (allstoreList.length != 0) {
    if (allstoreList[0].restaurant_catagory == "อาหารทะเล") {
      restaurant_catagory = "/seafood";
    } else if (allstoreList[0].restaurant_catagory == "ไก่ทอด") {
      restaurant_catagory = "/chicken";
    } else if (allstoreList[0].restaurant_catagory == "อาหารเส้น") {
      restaurant_catagory = "/noodle";
    } else if (allstoreList[0].restaurant_catagory == "ชา กาแฟ") {
      restaurant_catagory = "/coffee&tea";
    }
  }
  function getDistanceBetweenPointsNew(
    latitude1: string,
    longitude1: string,
    latitude2: string,
    longitude2: string,
    unit = "kilometers"
  ) {
    const theta = parseFloat(longitude1) - parseFloat(longitude2);
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
  function deg2rad(deg: any) {
    return deg * (Math.PI / 180);
  }
  function rad2deg(rad: any) {
    return rad * (180 / Math.PI);
  }

  const getLoaction: any = localStorage.getItem("location");
  let user_location = JSON.parse(getLoaction);

  useEffect(() => {
    if (user_location) {
      setUserLatitude(user_location.latitude);
      setUserLongitude(user_location.longitude);
    }
  }, []);

  return (
    <div className="mt-[100px]">
      <div className="bg-white mb-[10px] py-[10px] px-[10px] lg:px-[80px] xl:px-[120px]">
        <div className=" flex items-center bg-[#F7F7F7] rounded-[24px] h-[40px] pl-[24px] mb-[16px]">
          <SearchIcon className="text-[#676767]" />
          <input
            type="text"
            placeholder="ค้นหาร้านอาหาร"
            onChange={handleFilter}
            className=" bg-[#F7F7F7] ml-[10px] w-[95%] focus:outline-0 cursor-pointer"
          />
        </div>
        {/* <div className="flex flex-row justify-center gap-5 my-[26px] ">
          <div
            className="w-[135px] h-[85px] bg-[url('/image/catagory-image/ชานมไข่มุก.webp')] rounded-lg flex justify-center items-center "
            onClick={() => {
              updateToken();
              nevigate("/seafood");
            }}
          >
            <img
              src="../public/image/catagory-image/seafood.webp"
              className="  bg-cover rounded-lg"
              alt=""
            />
          </div>
          <div
            className="w-[135px] h-[85px] bg-[url('/image/catagory-image/ชานมไข่มุก.webp')] rounded-lg flex justify-center items-center "
            onClick={() => {
              updateToken();
              nevigate("/chicken");
            }}
          >
            <img
              src="../public/image/catagory-image/chicken.jpeg"
              className="  bg-cover rounded-lg"
              alt=""
            />
          </div>
          <div
            className="w-[135px] h-[85px] bg-[url('/image/catagory-image/ชานมไข่มุก.webp')] rounded-lg flex justify-center items-center "
            onClick={() => {
              updateToken();
              nevigate("/coffee&tea");
            }}
          >
            <img
              src="../public/image/catagory-image/ชานมไข่มุก.webp"
              className="  bg-cover rounded-lg"
              alt=""
            />
          </div>
          <div
            className="w-[135px] h-[85px] bg-[url('/image/catagory-image/ชานมไข่มุก.webp')] rounded-lg flex justify-center items-center "
            onClick={() => {
              updateToken();
              nevigate("/noodle");
            }}
          >
            <img
              src="../public/image/catagory-image/noodle.jpg"
              className="  bg-cover rounded-lg"
              alt=""
            />
          </div>
        </div> */}

        <Swiper
          className="w-full justify-center items-center"
          breakpoints={{
            300: {
              slidesPerView: 2,
            },
            425: {
              slidesPerView: 2.5,
            },
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 6,
            },
            1440: {
              slidesPerView: 8,
            },
            1980: {
              slidesPerView: 10,
            },
          }}
          slidesPerView={4}
          spaceBetween={5}
        >
          <SwiperSlide key={"seafood"}>
            <div
              className="w-[135px] h-[85px] bg-[url('/image/catagory-image/ชานมไข่มุก.webp')] rounded-lg flex justify-center items-center brightness-75"
              onClick={() => {
                updateToken();
                nevigate("/seafood");
              }}
            >
              <img
                src="./public/image/catagory-image/seafood.webp"
                className="  bg-cover rounded-lg"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key={"chicken"}>
            <div
              className="w-[135px] h-[85px] bg-[url('/image/catagory-image/ชานมไข่มุก.webp')] rounded-lg flex justify-center items-center bg-white brightness-75"
              onClick={() => {
                updateToken();
                nevigate("/chicken");
              }}
            >
              <img
                src="./public/image/catagory-image/chicken.webp"
                className="  bg-cover rounded-lg"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key={"coffee&tea"}>
            <div
              className="w-[135px] h-[85px] bg-[url('/image/catagory-image/ชานมไข่มุก.webp')] rounded-lg flex justify-center items-center brightness-75"
              onClick={() => {
                updateToken();
                nevigate("/coffee&tea");
              }}
            >
              <img
                src="./public/image/catagory-image/ชานมไข่มุก.webp"
                className="  bg-cover rounded-lg"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key={"noodle"}>
            <div
              className="w-[135px] h-[85px] bg-[url('/image/catagory-image/ชานมไข่มุก.webp')] rounded-lg flex justify-center items-center brightness-75"
              onClick={() => {
                updateToken();
                nevigate("/noodle");
              }}
            >
              <img
                src="./public/image/catagory-image/noodle.jpg"
                className="  bg-cover rounded-lg"
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="bg-white px-[10px] md:px-[30px] pt-[50px]  ">
        <div className="md:pl-[24px] lg:px-[30px] xl:px-[120px]">
          <Link to={"/home"}>
            <span className="text-[#4ca3b3] cursor-pointer">บ้าน</span>
          </Link>
          <ArrowForwardIosIcon className="text-[16px]" />{" "}
          <Link to={"/allstore"}>
            <span className="text-[#4ca3b3] cursor-pointer">
              ร้านทั้งหมด <ArrowForwardIosIcon className="text-[16px]" />
            </span>
          </Link>
          <Link to={`${restaurant_catagory}`}>
            <span className="text-[black] cursor-pointer">
              {allstoreList[0].restaurant_catagory}
              <ArrowForwardIosIcon className="text-[16px]" />
            </span>
          </Link>
        </div>
        <div className="mb-[20px] text-[20px] font-[500] md:text-[36px] md:pl-[24px] lg:px-[30px] xl:px-[120px]">
          ร้านค้าทั้งหมด
        </div>
        <div className="flex flex-col md:flex-row md:flex-wrap md:w-full md:px-[10px]  justify-center lg:px-[30px] xl:px-[120px]">
          {filteredUsers?.map((item: any) => {
            let haveLocation = false;
            let distance: any;
            let time;
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
                className="flex gap-1 items-start justify-items-center  mb-[20px] md:mb-[40px]  md:w-[50%] lg:w-[25%] md:px-[8px] lg:items-start"
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

export default StoreListCatagory;
