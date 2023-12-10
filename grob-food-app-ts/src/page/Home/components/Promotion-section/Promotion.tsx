import { useEffect, useState } from "react";
// Import Swiper React components
import { RestaurantsCard } from "..";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GROBFOOD_USER_URL } from "../../../../util/constants/constant";
// import StarIcon from "@mui/icons-material/Star";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
interface storeList {
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
const Promotion = () => {
  const [storeList, setStoreList] = useState<Array<storeList>>([]);
  const getStore = async () => {
    console.log();
    const response = await axios.post(`${GROBFOOD_USER_URL}/getallstorelist`);
    if (response.data.success) {
      setStoreList(response.data.data);
    } else {
      console.log("err");
    }
  };
  useEffect(() => {
    getStore();
  }, []);
  console.log(storeList);

  const nevigate = useNavigate();
  return (
    <div className="pt-[48px] px-[5%] max-w-[1300px] mx-[auto]">
      <div>
        <span className=" text-[#1c1c1c] text-[20px] md:text-[32px] font-[500]">
          ร้านค้าทั้งหมดใน{" "}
        </span>
        <span className="text-[#00b14f] text-[20px] md:text-[32px] font-[500]">
          GrobFood
        </span>
      </div>
      <div className="mt-[20px]">
        <div>
          {/* <Swiper
            className=""
            spaceBetween={10}
            slidesPerView={2}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide className="bg-cover  min-w-[200px] max-w-[240px] border-2">
              <RestaurantsCard />
            </SwiperSlide>
            <SwiperSlide className="bg-cover  min-w-[200px] max-w-[240px] border-2">
              <RestaurantsCard />
            </SwiperSlide>
            <SwiperSlide className="bg-cover  min-w-[200px] max-w-[240px] border-2">
              <RestaurantsCard />
            </SwiperSlide>
            <SwiperSlide className="bg-cover  min-w-[200px] max-w-[240px] border-2">
              <RestaurantsCard />
            </SwiperSlide>
          </Swiper> */}
          <Swiper
            breakpoints={{
              300: {
                slidesPerView: 2,
              },
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            slidesPerView={4}
            spaceBetween={50}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <RestaurantsCard />
            </SwiperSlide>
            <SwiperSlide>
              <RestaurantsCard />
            </SwiperSlide>
            <SwiperSlide>
              <RestaurantsCard />
            </SwiperSlide>
            <SwiperSlide>
              <RestaurantsCard />
            </SwiperSlide>
            {/* {storeList && (
              <Swiper
                breakpoints={{
                  300: {
                    slidesPerView: 2,
                  },
                  576: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
                slidesPerView={4}
                spaceBetween={50}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {storeList?.map((list) => {
                <SwiperSlide>
                  <div className="pb-[16px]">
                    <div className="">
                      <img
                        className="bg-cover"
                        src="https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/THGFIST000007ad/list/746be633d7e54ef3aedb6c04d1bde919_1693153512508128747.webp"
                        alt=""
                      />
                    </div>
                    <div className="text-[14px] mb-[6px] font-semibold">
                      {list.restaurant_name}
                    </div>
                    <div className="text-[12px] mb-[4px]">ไก่ทอด,ฟาสฟู๊ด</div>
                    <div className="flex flex-row items-center">
                      <div className="flex flex-row items-center">
                        <StarIcon className="text-[#F7C942] w-[18px] h-[18px]" />
                        <span className="text-[12px] text-[#676767]">4.7</span>
                      </div>
                      <div className="ml-[6%] flex items-center">
                        <AccessTimeIcon className="w-[18px] h-[18px] p-0 text-[#676767]" />
                        <span className="text-[12px] text-[#676767]">
                          40 นาที &nbsp;&nbsp;•&nbsp;&nbsp; 4.9 km
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>;
              })}
              </Swiper>
            )} */}
          </Swiper>
        </div>
      </div>
      <button
        className="w-full h-[48px] border border-[#676767] rounded-[6px] text-[#676767] mt-[20px] font-semibold"
        onClick={() => {
          nevigate("/allstore");
        }}
      >
        ดูร้านค้าทั้งหมด
      </button>
      <div></div>
    </div>
  );
};

export default Promotion;
