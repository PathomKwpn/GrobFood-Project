import React from "react";
// Import Swiper React components
import { RestaurantsCard } from "..";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Button from "@mui/material/Button";
const Promotion = () => {
  return (
    <div className="pt-[48px] px-[5%] max-w-[1300px] mx-[auto]">
      <div>
        <span className=" text-[#1c1c1c] text-[20px] md:text-[32px] font-[500]">
          โปรโมชั่น GrobFood ใน{" "}
        </span>
        <span className="text-[#00b14f] text-[20px] md:text-[32px] font-[500]">
          Bangkok
        </span>
      </div>
      <div className="mt-[20px]">
        <div>
          <Swiper
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
          </Swiper>
        </div>
      </div>
      <button className="w-full h-[48px] border border-[#676767] rounded-[6px] text-[#676767] mt-[20px] font-semibold">
        See all promotion
      </button>
      <div></div>
    </div>
  );
};

export default Promotion;
