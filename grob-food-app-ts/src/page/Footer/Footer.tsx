import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
const Footer = () => {
  return (
    <div>
      <div className="w-full h-[auto] bg-[#EAEFF2] p-[10px] md:px-[5%]">
        <div className="w-full border-b-[1px] pb-[20px] pt-[40px]">
          <div className="w-[100px]">
            <Link to={"/home"}>
              <img
                src="../image/logo-grabfood/logo-GrobFood.png"
                className="bg-cover"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="flex justify-between my-[16px]">
          <span className="text-[#363A45] font-[500]">คำค้นหายอดนิยม</span>
          <ExpandMoreIcon className="text-[18px] text-[#888888]" />
        </div>
        <div className="flex justify-between my-[16px]">
          <span className="text-[#363A45] font-[500]">อาหารยอดนิยม</span>
          <ExpandMoreIcon className="text-[18px] text-[#888888]" />
        </div>
        <div className="flex justify-between my-[16px]">
          <span className="text-[#363A45] font-[500]">เกี่ยวกับ Grab</span>
          <ExpandMoreIcon className="text-[18px] text-[#888888]" />
        </div>
        <div className="flex justify-between my-[16px]">
          <span className="text-[#363A45] font-[500]">บริการช่วยเหลือ</span>
          <ExpandMoreIcon className="text-[18px] text-[#888888]" />
        </div>
      </div>
      <div className="w-full h-[auto] bg-[#363A45] p-[5%] pt-[32px] pb-[48px]">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="w-full justify-center md:justify-start flex mb-[16px]">
              <span className="text-[white]">ประเทศที่ให้บริการ GrabFood</span>
            </div>
            <ul className="flex flex-wrap justify-center mb-[32px]">
              <li className="">
                <a href="" className="text-[white] font-[300] text-[14px]">
                  อินโดนีเซีย
                </a>
                <span className="px-[6px] text-[#6b7896]">|</span>
              </li>
              <li>
                <a href="" className="text-[white] font-[300] text-[14px]">
                  ฟิลิปปินส์
                </a>
                <span className="px-[6px] text-[#6b7896]">|</span>
              </li>
              <li>
                <a href="" className="text-[white] font-[300] text-[14px]">
                  ไทย
                </a>
                <span className="px-[6px] text-[#6b7896]">|</span>
              </li>
              <li>
                <a href="" className="text-[white] font-[300] text-[14px]">
                  เวียดนาม
                </a>
                <span className="px-[6px] text-[#6b7896] font-[8px]">|</span>
              </li>
              <li>
                <a href="" className="text-[white] font-[300] text-[14px]">
                  สิงคโปร์
                </a>
                <span className="px-[6px] text-[#6b7896]">|</span>
              </li>
              <li>
                <a href="" className="text-[white] font-[300] text-[14px]">
                  มาเลเซีย
                </a>
                <span className="px-[6px] text-[#6b7896]">|</span>
              </li>
              <li>
                <a href="" className="text-[white] font-[300] text-[14px]">
                  พม่า
                </a>
              </li>
            </ul>
          </div>
          <ul className="flex justify-center mb-[14px]">
            <FacebookIcon className="w-[32px] h-[32px] p-0 m-0 text-[white] mx-[10px]" />
            <InstagramIcon className="w-[32px] h-[32px] p-0 m-0 text-[white] mx-[10px]" />
            <TwitterIcon className="w-[32px] h-[32px] p-0 m-0 text-[white] mx-[10px]" />
          </ul>
        </div>
        <div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full flex flex-col justify-center">
              <span className="text-[16px] text-[#AFB0B4] font-[300] mb-[8px]">
                © Grab 2023
              </span>
              <div>
                <span className="text-white">
                  เงื่อนไขในการให้บริการ • นโยบายความปลอดภัย
                </span>
              </div>
            </div>
            <div className="flex justify-center flex-wrap gap-[20px] mt-[16px]">
              <img
                className="w-[120px]"
                src="../image/appstore&googleplay/logo-appstore.svg"
                alt=""
              />
              <img
                className="w-[120px]"
                src="../image/appstore&googleplay/logo-playstore.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
