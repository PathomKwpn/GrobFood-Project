import React from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import MyLocationIcon from "@mui/icons-material/MyLocation";
type locationProp = {
  getUserlocation: any;
  noLocationPopup: "open" | "close";
  setAddressDetail: React.Dispatch<React.SetStateAction<string>>;
  setNoteToDriver: React.Dispatch<React.SetStateAction<string>>;
};
const Location = ({
  getUserlocation,
  setAddressDetail,
  setNoteToDriver,
  noLocationPopup,
}: locationProp) => {
  const getLoaction = localStorage.getItem("location");
  //   let user_location = JSON.parse(getLoaction);
  return (
    <>
      <div className="h-[auto] mt-[20px] max-w-[700px]  bg-white rounded-md w-[95%]">
        <div className="border-b-[1px] py-[16px]">
          <span className="text-[24px] font-[500] px-[5%]">ที่อยู่</span>
        </div>
        <div className="mt-[20px] flex justify-center items-center w-full ">
          <div className="mb-[12px] flex px-[10px] w-[95%]">
            <span className=" mr-[14px] flex justify-center items-center">
              <FmdGoodIcon className="text-[32px] text-[#ac3131]" />
            </span>

            <input
              type="text"
              className=" w-full h-[48px] border border-[#c5c5c5] outline-0 focus:border-[#1ebd60] rounded-[4px] px-[24px] py-[6px] text-[14px] text-[#7a7a7a]"
              placeholder="ระบุตำแหน่งของคุณ"
              value={getLoaction ? getLoaction : ""}
            />
            <span className="ml-[14px] flex justify-center items-center">
              <MyLocationIcon
                className="text-[24px] text-[#ff9457]"
                onClick={() => {
                  getUserlocation();
                }}
              />
            </span>
          </div>
        </div>
        <div className="w-full flex justify-center my-[16px]">
          <div className="w-[80%]">
            <div className="mb-[12px] text-[#7a7a7a]">รายละเอียดที่อยู่</div>
            <input
              type="text"
              className=" w-full h-[48px] border border-[#c5c5c5] outline-0 focus:border-[#1ebd60] rounded-[4px] px-[24px] py-[6px] text-[14px] text-[#7a7a7a]"
              placeholder="เช่น ชั้น หมายเลขอาคาร"
              onChange={(e) => {
                setAddressDetail(e.target.value);
              }}
            />
            <div className="mb-[12px] text-[#7a7a7a] my-[12px]">
              หมายเหตุถึงคนขับ
            </div>
            <input
              type="text"
              className=" w-full h-[48px] border border-[#c5c5c5] outline-0 focus:border-[#1ebd60] rounded-[4px] px-[24px] py-[6px] text-[14px] text-[#7a7a7a] mb-[16px]"
              placeholder="เช่น เจอกันที่ล็อบบี้"
              onChange={(e) => {
                setNoteToDriver(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      {noLocationPopup == "open" && (
        <div
          className=" fixed top-[10%]  bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
          role="alert"
        >
          <p className="font-bold md:text-[24px]">โปรดระบุตำแหน่งของคุณ</p>
          <p className="md:text-[18px]">
            กรุณาระบุตำแหน่งของคุณเพื่อให้คนขับทราบ.
          </p>
        </div>
      )}
    </>
  );
};

export default Location;
