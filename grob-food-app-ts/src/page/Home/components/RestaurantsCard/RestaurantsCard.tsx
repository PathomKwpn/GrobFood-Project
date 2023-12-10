import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
const RestaurantsCard = () => {
  return (
    <div className="pb-[16px]">
      <div className="">
        <img
          className="bg-cover"
          src="https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/THGFIST000007ad/list/746be633d7e54ef3aedb6c04d1bde919_1693153512508128747.webp"
          alt=""
        />
      </div>
      <div className="text-[14px] mb-[6px] font-semibold">
        KFC(เคเอฟซี) คลองถม
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
  );
};

export default RestaurantsCard;
