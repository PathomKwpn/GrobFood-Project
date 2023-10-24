import React from "react";
import CheckIcon from "@mui/icons-material/Check";
const DetailQuestion = () => {
  return (
    <div className="mt-[40px] px-[5%] max-w-[1300px] mx-[auto]">
      <div className="text-[36px] xl:text-[41px] font-[500] mb-[40px]">
        ทำไมต้องเป็น GrobFood?
      </div>
      <ul>
        <li className="text-[14px] xl:text-[18px] flex gap-3 my-[16px]">
          <CheckIcon className="text-[#00B140] w-[15px]" />
          <div>
            <span className="text-[#1c1c1c] font-[500] items-center">
              รวดเร็วที่สุด
            </span>
            <span className="text-[#1c1c1c] font-[300]">
              {" "}
              - GrobFood ให้บริการจัดส่งอาหารที่รวดเร็วที่สุดในตลาด
            </span>
          </div>
        </li>
        <li className="text-[14px] xl:text-[18px] flex gap-3 my-[16px]">
          <CheckIcon className="text-[#00B140] w-[15px]" />
          <div>
            <span className="text-[#1c1c1c] font-[500] items-center">
              ง่ายที่สุด
            </span>
            <span className="text-[#1c1c1c] font-[300]">
              {" "}
              - ตอนนี้การสั่งอาหารของคุณนั้น ง่ายดายเพียงไม่กี่คลิกบนหน้าจอ
              สั่งอาหารออนไลน์หรือดาวน์โหลด Grab
              ซูเปอร์แอปของเราเพื่อประสบการณ์ความรวดเร็วและความคุ้มค่ามากยิ่งขึ้น
            </span>
          </div>
        </li>
        <li className="text-[14px] xl:text-[18px] flex gap-3 my-[16px]">
          <CheckIcon className="text-[#00B140] w-[15px]" />
          <div>
            <span className="text-[#1c1c1c] font-[500] items-center">
              อาหารสำหรับทุกความปรารถนา
            </span>
            <span className="text-[#1c1c1c] font-[300]">
              {" "}
              - ตั้งแต่อาหารท้องถิ่นไปจนถึงอาหารจานโปรด
              ตัวเลือกอาหารที่หลากหลายของเราจะตอบสนองต่อทุกความต้องการของคุณ
            </span>
          </div>
        </li>
        <li className="text-[14px] xl:text-[18px] flex gap-3 my-[16px]">
          <CheckIcon className="text-[#00B140] w-[15px]" />
          <div>
            <span className="text-[#1c1c1c] font-[500] items-center">
              ชำระเงินได้อย่างง่ายดาย
            </span>
            <span className="text-[#1c1c1c] font-[300]">
              {" "}
              - การจัดส่งอาหารให้คุณเป็นเรื่องง่าย
              แม้แต่การชำระเงินก็ง่ายและสะดวกมากยิ่งขึ้นด้วย GrabPay
            </span>
          </div>
        </li>
        <li className="text-[14px] xl:text-[18px] flex gap-3 my-[16px]">
          <CheckIcon className="text-[#00B140] w-[15px]" />
          <div>
            <span className="text-[#1c1c1c] font-[500] items-center">
              รางวัลตอบแทนมากขึ้น
            </span>
            <span className="text-[#1c1c1c] font-[300]">
              {" "}
              - รับคะแนนสะสม GrabRewards สำหรับทุกคำสั่งซื้อของคุณ
              และใช้คะแนนแลกของรางวัลเพิ่มเติม
            </span>
          </div>
        </li>
      </ul>
      <div>
        <div className="text-[36px] my-[40px] font-[500] text-[#1c1c1c]">
          คำถามที่พบบ่อย
        </div>
        <div className="text-[24px] text-[#1c1c1c] font-[500] my-[16px]">
          GrobFood คืออะไร?
        </div>
        <div className="text-[14px] font-[300] mb-[30px]">
          GrabFood เป็นบริการจัดส่งอาหารที่รวดเร็วที่สุดในประเทศไทย
          เราได้จัดเตรียมอาหารจานโปรด ร้านอาหาร และอาหารอร่อยอื่นๆ ทั้งหมดของคุณ
          เพื่อช่วยให้คุณสามารถเลือกอาหารของคุณด้วยวิธีที่ง่ายและรวดเร็วที่สุดเท่าที่จะเป็นไปได้
          ค้นหาและสั่งอาหารที่คุณชื่นชอบได้จากทั่วทั้งประเทศไทย
          คุณสามารถค้นหาและสั่งอาหารจานโปรดของคุณได้ทั่วไทย
          เพียงแค่แตะไม่กี่ครั้งผ่านระบบออนไลน์ ไม่ว่าจะเป็นออน ล๊อก หยุ่น (On
          Lok Yun) ที่วังบูรพาภิรมย์สำหรับอาหารเช้า เปปเปอร์ ลันช์ (Pepper
          Lunch) ที่สยามสแควร์วันสำหรับมื้อเที่ยง และไทย ไทย (Thai Thai Boat
          Noodles) ที่ถนนอังรีดูนังค์สำหรับมื้อค่ำ!
          เราอยู่ที่นี่เพื่อตอบสนองความหิวของคุณด้วยร้านพันธมิตรในประเทศไทยมากมายให้เลือกสรร
        </div>
        <button className="w-full h-[48px] border border-[#676767] rounded-[6px] text-[#676767] my-[24px] font-semibold">
          Read more
        </button>
      </div>
    </div>
  );
};

export default DetailQuestion;
