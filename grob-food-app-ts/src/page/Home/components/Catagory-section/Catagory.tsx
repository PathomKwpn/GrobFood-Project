import { useNavigate } from "react-router-dom";

const Catagory = () => {
  const nevigate = useNavigate();
  return (
    <div className="mt-[40px] px-[5%] max-w-[1300px] mx-[auto] mb-[120px]">
      <div className="text-[20px] md:text-[24px] xl:text-[36px] font-semibold mb-[15px]">
        เมนูมากมายเพื่อคุณ
      </div>
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          <div className="w-full px-[5%] h-full ">
            <div
              className="bg-cover mb-[10px]"
              onClick={() => {
                nevigate("/seafood");
              }}
            >
              <img
                className="bg-cover w-full rounded-md h-[80px] md:h-[120px] lg:h-[160px] shadow-md"
                src="./image/catagory-image/seafood.webp"
                alt=""
              />
            </div>
            <div className="font-bold">อาหารทะเล</div>
          </div>
          <div className="w-full px-[5%] h-full">
            <div
              className="bg-cover mb-[10px]"
              onClick={() => {
                nevigate("/chicken");
              }}
            >
              <img
                className="bg-cover w-full rounded-md h-[80px] md:h-[120px] lg:h-[160px] shadow-md"
                src="./image/catagory-image/chicken.jpeg"
                alt=""
              />
            </div>
            <div className="font-bold">ไก่ทอด</div>
          </div>
          <div className="w-full px-[5%] h-[auto]">
            <div
              className="bg-cover mb-[10px]"
              onClick={() => {
                nevigate("/coffee&tea");
              }}
            >
              <img
                className="bg-cover w-full rounded-md h-[80px] md:h-[120px] lg:h-[160px] shadow-md"
                src="./image/catagory-image/ชานมไข่มุก.webp"
                alt=""
              />
            </div>
            <div className="font-bold">ชา กาแฟ</div>
          </div>
          <div className="w-full px-[5%] h-[auto]">
            <div
              className="bg-cover mb-[10px]"
              onClick={() => {
                nevigate("/noodle");
              }}
            >
              <img
                className="bg-cover w-full rounded-md h-[80px] md:h-[120px] lg:h-[160px] shadow-md"
                src="./image/catagory-image/noodle.jpg"
                alt=""
              />
            </div>
            <div className="font-bold">อาหารเส้น</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catagory;
