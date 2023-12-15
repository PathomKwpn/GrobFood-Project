import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const DetailQuestion = () => {
  const [readMoreState, setReadMoreState] = useState<true | false>(false);
  const [readMoreButtonText, setReadMoreButtonText] = useState<
    "Read More" | "Hide"
  >("Read More");
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
        <button
          className="w-full h-[48px] border border-[#676767] rounded-[6px] text-[#676767] my-[24px] font-semibold flex justify-center items-center"
          onClick={() => {
            setReadMoreState(!readMoreState);
            setReadMoreButtonText(
              readMoreState == false ? "Hide" : "Read More"
            );
          }}
        >
          {readMoreButtonText}{" "}
          {readMoreState == true ? (
            <ArrowUpwardIcon className="text-[16px]" />
          ) : (
            <ArrowDownwardIcon className="text-[16px]" />
          )}
        </button>
        {readMoreState == true && (
          <div>
            <div className="text-[24px] text-[#1c1c1c] font-[500] my-[16px]">
              สั่งอาหารออนไลน์บน GrabFood อย่างไร?
            </div>
            <ol className="text-[14px] font-[300] mb-[30px] list-decimal">
              วิธีที่ง่ายที่สุดในการสั่งอาหารจาก GrabFood ในประเทศไทย มีดังนี้:
              <li className="ml-[30px]">
                <span className="font-[500]">
                  ค้นหาร้านอาหารหรืออาหารที่คุณชื่นชอบ -
                </span>{" "}
                กรอกที่อยู่ของคุณในหน้าแรก แล้วดูรายชื่อร้านอาหารที่อยู่ใกล้คุณ
                เลือกร้านอาหารที่คุณชื่นชอบ และเลือกดูเมนูอาหาร
                แล้วจึงเลือกอาหารที่คุณต้องการสั่งซื้อ
              </li>
              <li className="ml-[30px]">
                <span className="font-[500]">ตรวจสอบและชำระเงิน -</span>
                เมื่อคุณแน่ใจว่าคุณสั่งอาหารเพียงพอแล้ว ให้คลิกบนแท็บ “ORDER
                NOW” แล้วกรอกที่อยู่สุดท้ายสำหรับการจัดส่งอาหารของคุณ
                เลือกวิธีการชำระเงินที่เหมาะสมกับคุณมากที่สุด แล้วชำระเงิน
              </li>
              <li className="ml-[30px]">
                <span className="font-[500]">การจัดส่ง - </span>GrabFood
                ได้รับการออกแบบวิธีการใช้งานของลูกค้าให้มีความราบรื่นสำหรับคุณ
                ดังนั้นคุณสามารถเพลิดเพลินกับอาหารได้อย่างไม่ยุ่งยาก
                เราจะส่งอีเมลและข้อความ SMS
                เพื่อยืนยันคำสั่งซื้อของคุณและแจ้งเวลาที่คาดว่าคุณจะได้รับอาหารที่สั่ง
                อาหารของคุณกำลังจะมาถึงแล้ว
              </li>
            </ol>
            <hr />
            <br />
            <div className="text-[24px] text-[#1c1c1c] font-[500] my-[16px]">
              GrabFood ให้บริการจัดส่งอาหารทุกวัน ตลอด 24 ชั่วโมงหรือไม่??
            </div>
            <div className="text-[14px] font-[300] mb-[30px]">
              เราเข้าใจเพียงภาษาเดียว นั่นคือ อาหาร ดังนั้น ใช่แล้ว
              เราให้บริการทุกวัน ตลอด 24 ชั่วโมง...
              โปรดรับทราบว่าแม้ว่าเราจะเป็นพันธมิตรด้านอาหารของคุณทุกวัน ตลอด 24
              ชั่วโมง
              แต่ร้านอาหารบางแห่งในรายการของเราอาจจะมีข้อจำกัดในการจัดส่งอาหารในช่วงดึก
              หรืออาจจะไม่พร้อมสำหรับการสั่งซื้อ
              แต่เราจะมีรายชื่อสำหรับผู้ที่รับประทานอาหารยามดึกในส่วนของการจัดส่งรอบดึกของเรา
            </div>
            <hr />
            <br />
            <div className="text-[24px] text-[#1c1c1c] font-[500] my-[16px]">
              GrabFood รับเงินสดหรือไม่?
            </div>
            <div className="text-[14px] font-[300] mb-[30px]">
              แน่นอน เรารับเงินสด! GrabFood
              รับการชำระเงินในทุกรูปแบบสำหรับการบริการจัดส่งอาหาร
              รวมถึงเงินสดในการจัดส่งในประเทศไทย
            </div>
            <hr />
            <br />
            <div className="text-[24px] text-[#1c1c1c] font-[500] my-[16px]">
              ฉันสามารถชำระเงินออนไลน์บน GrabFood
              สำหรับคำสั่งซื้ออาหารของฉันได้หรือไม่?
            </div>
            <div className="text-[14px] font-[300] mb-[30px]">
              GrabFood รับการชำระเงินในหลากหลายรูปแบบสำหรับการสั่งอาหารออนไลน์
              รวมถึงการชำระเงินออนไลน์ในประเทศไทยโดยใช้บัตรเครดิตหรือบัตรเดบิต
              PayPal หรือชำระเงินสดในการจัดส่ง เราขอแนะนำการใช้งาน GrabPay
              ซึ่งคุณจะได้รับคะแนนสะสมเพิ่มขึ้น
              และคุณสามารถนำไปใช้เป็นส่วนลดในการสั่งซื้อครั้งต่อไป
              และการบริการอื่นๆของ Grab
            </div>
            <hr />
            <br />
            <div className="text-[24px] text-[#1c1c1c] font-[500] my-[16px]">
              ฉันสามารถสั่ง GrabFood ให้คนอื่นได้หรือไม่?
            </div>
            <div className="text-[14px] font-[300] mb-[30px]">
              แน่นอน
              เอาใจใส่คนที่คุณรักด้วยอาหารจานโปรดของพวกเขาที่จัดส่งถึงหน้าประตู
              เพียงอัปเดตชื่อและที่อยู่ในการจัดส่งของผู้รับ ก่อนทำการสั่งซื้อ
            </div>
            <hr />
            <br />
            <div className="text-[24px] text-[#1c1c1c] font-[500] my-[16px]">
              GrabFood คิดค่าจัดส่งอาหารเท่าไร?
            </div>
            <div className="text-[14px] font-[300] mb-[30px]">
              ค่าจัดส่งของเราขึ้นอยู่กับปัจจัยการดำเนินงานหลายประการ เช่น
              ระยะทางจากตำแหน่งของคุณไปยังร้านอาหาร เป็นต้น
              คุณสามารถตรวจสอบจำนวนเงินที่คุณต้องจ่ายเป็นค่าจัดส่งก่อนที่จะชำระเงินบนแอป
              Grab นอกจากนี้ยังมีส่วนของ “Free Delivery”
              ซึ่งจะมีรายชื่อร้านอาหารที่อยู่ใกล้คุณที่ไม่คิดค่าจัดส่ง
            </div>
            <hr />
            <br />
            <div className="text-[24px] text-[#1c1c1c] font-[500] my-[16px]">
              มีร้านอาหารใดบ้างที่อยู่ใน GrabFood
            </div>
            <div className="text-[14px] font-[300] mb-[30px]">
              อะไรที่ไม่มีอยู่ใน GrabFood? เรามีร้านอาหารและอาหารประเภทต่างๆ
              ที่มากมายหลากหลายที่สุดในบรรดาแอปส่งอาหารในประเทศไทย
              คุณสามารถเลือกร้านอาหารนับพันร้านบน GrabFood Thailand
              คุณสามารถสั่งอาหารออนไลน์จากร้านอาหารที่คุณชื่นชอบทั้งหมด
              ไม่ว่าจะเป็น บอนชอน (BonChon), เดอะพิซซ่า คอมปะนี (The Pizza
              Company), แมคโดนัลด์ (McDonald's), พิซซ่าฮัท (Pizza Hut), เท็กซัส
              ชิคเก้น (Texas Chicken), ยาโยอิ (Yayoi Japanese Restaurant),
              เบอร์เกอร์ คิง (Burger King), สตาร์บัคส์ (Starbucks), โคโค่
              อิฉิบันยะ (Coco Ichibanya) และอื่นๆ อีกมากมาย นอกจากนี้ GrabFood
              ยังมีโปรโมชัน ข้อเสนอ
              และส่วนลดพิเศษสำหรับร้านอาหารในรายการของเราในเวลาจำกัด
              คุณสามารถเพลิดเพลินกับส่วนลดมากมาย และข้อเสนออื่นๆ
              อีกมากมายสำหรับการสั่งอาหารของคุณ ตอนนี้ถึงเวลาไปรับอาหารนั่นแล้ว!
            </div>
            <hr />
            <br />
            <div className="text-[24px] text-[#1c1c1c] font-[500] my-[16px]">
              GrabFood มีคำสั่งซื้อขั้นต่ำหรือไม่?
            </div>
            <div className="text-[14px] font-[300] mb-[30px]">
              ใช่แล้ว! แต่คุณสามารถชำระเงินส่วนต่าง
              ถ้าคำสั่งซื้อของคุณน้อยกว่ายอดคำสั่งซื้อขั้นต่ำ
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailQuestion;
