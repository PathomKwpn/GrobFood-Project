import FmdGoodIcon from "@mui/icons-material/FmdGood";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import Button from "@mui/material/Button";
import { green, orange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const SearchForm = ({ saveLocation }: any) => {
  const getOwner = localStorage.getItem("user");
  const nevigate = useNavigate();
  const getUserlocation = () => {
    if (!getOwner) {
      nevigate("/login");
    } else {
      navigator.geolocation.getCurrentPosition(function (position) {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        saveLocation(location);
      });
    }
  };
  const getLoaction = localStorage.getItem("location");

  return (
    <div className="w-[100%] my-[50px] px-[5%] md:max-w-[360px] md:absolute md:z-[1px] md:top-[10vh] bg-[#FFFFFF] md:pt-[50px] md:pb-[90px] md:px-[20px] md:rounded-lg md:ml-[40px] mt-[150px] md:mt-[100px]">
      <div className="mb-[24px]">
        <div className="text-[14px] md:text-[20px] font-medium text-[#1C1C1C]">
          ยินดีต้อนรับ
        </div>
        <div className="text-[24px] md:text-[36px] font-semibold text-[#1C1C1C]">
          ต้องการให้เราส่งอาหารไปที่ไหน?
        </div>
      </div>
      <div className=" relative">
        <div className="mb-[12px]">
          <span className="absolute top-[50%] translate-y-[-50%] ml-[14px]">
            <FmdGoodIcon sx={{ color: orange[900] }} />
          </span>
          <span className="absolute top-[50%] translate-y-[-50%] right-[15px] flex justify-center">
            <MyLocationIcon
              className="text-[12px] cursor-pointer"
              sx={{ color: green[500] }}
              fontSize="small"
              onClick={() => {
                getUserlocation();
              }}
            />
          </span>
          <input
            type="text"
            className="w-full h-[48px] border border-[#c5c5c5] outline-0 focus:border-[#1ebd60] rounded-[4px] px-[48px] py-[6px] text-[14px] text-[#7a7a7a]"
            placeholder="ระบุตำแหน่งของคุณ"
            defaultValue={getLoaction ? getLoaction : ""}
          />
        </div>
      </div>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#00b14f",
        }}
        onClick={() => {
          nevigate("/allstore");
        }}
        className="w-full h-[48px] font-semibold text-[16px]"
      >
        ค้นหา
      </Button>
    </div>
  );
};

export default SearchForm;
