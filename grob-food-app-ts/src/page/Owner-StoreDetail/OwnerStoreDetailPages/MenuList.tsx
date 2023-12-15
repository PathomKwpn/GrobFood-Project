import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import axios from "axios";
import { GROBFOOD_USER_URL } from "../../../util/constants/constant";
import DeleteIcon from "@mui/icons-material/Delete";
const MenuList = ({ restaurant_id }: any) => {
  //OWNER
  const getOwner: any = localStorage.getItem("user");
  const ownerInfo = JSON.parse(getOwner);
  const owner_id = ownerInfo.id;
  const dataOwner: any = {
    owner_id: owner_id,
  };
  //STATE
  const [addMenuState, setAddMenuState] = useState(false);
  const [addTopicState, setAddTopicState] = useState(false);
  //SHOW DATA

  const [resTopic, setResTopic] = useState("");
  //GET TOPIC
  const [resTopicArray, setResTopicArray] = useState([]);
  //GET MENUS
  const [resMenus, setResMenus] = useState([]);
  const [menu_name, setMenu_Name] = useState("");
  const [menu_price, setMenu_Price] = useState("");
  const [menu_catagory, setMenu_Catagory] = useState("");
  const [restaurant_topic_id, setRestaurant_topic_id] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [lastnameImage, setLastnameImage] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const handleChange = (event: any) => {
    setMenu_Catagory(event.target.value);
  };
  const handleUploadImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
    } else {
    }
    console.log(file);
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setLastnameImage(file.type.split("/").pop());
      // console.log(reader.result);
      setImageBase64(reader.result);
      setImagePreviewUrl(reader.result);
      // console.log(imageBase64);
    };
  };
  const addMenu = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/addmenu`, data);
    const topic_id = {
      restaurant_topic_id: resTopic,
    };
    console.log(topic_id, "topic");
    getMenus(topic_id);
  };
  const addNewTopic = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/addtopic`, data);
    if (response.data.success) {
      console.log("Add new topic already");
      getStoreTopic(dataOwner);
    } else {
      console.log("Errorr");
    }
  };
  const getStoreTopic = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getstoretopic`,
      data
    );

    if (response.data.success) {
      setResTopicArray(response.data.data);
    } else {
      console.log("err");
    }
  };
  useEffect(() => {
    getStoreTopic(dataOwner);
  }, []);

  const getMenus = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/getmenu`, data);
    if (response.data.success) {
      setResMenus(response.data.data);
    } else {
      console.log("err");
    }
  };
  const deleteMenu = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/deletemenu`, data);
    const topic_id = {
      restaurant_topic_id: resTopic,
    };
    if (response.data.success) {
      getMenus(topic_id);
    } else {
      console.log("ERROR");
    }
  };
  const deleteTopic = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/deletetopic`, data);

    if (response.data.success) {
      getStoreTopic(dataOwner);
    } else {
      console.log("ERROR");
    }
  };
  const [restaurant_topic_name, setRestaurant_topic_name] = useState("");
  return (
    <div className="bg-white w-[100%] lg:max-w-[1000px] rounded-lg shadow-xl">
      <div className="flex justify-center mb-[40px] mt-[20px] text-[28px] font-bold">
        เมนู
      </div>
      {addTopicState == true && (
        <div className="absolute w-[95%] md:w-[400px] h-[200px] bg-[white] left-[50%] translate-x-[-50%] drop-shadow-xl shadow-2xl border-2 rounded-lg z-10">
          <div className="flex justify-center font-bold text-[18px] mt-[15px]">
            เพิ่มรายการหมวดหมู่
          </div>
          <div className="flex justify-center flex-col items-center my-[20px]">
            <div className="text-[16px] font-semibold">ชื่อหมวดหมู่</div>
            <TextField
              label=""
              color="success"
              className=" bg-slate-200 w-[80%] h-[40px]"
              focused
              size="small"
              value={restaurant_topic_name}
              onChange={(v) => {
                setRestaurant_topic_name(v.target.value);
              }}
            />
          </div>
          <div className="flex w-[100%] justify-center">
            <Button
              key={"Confirm"}
              variant="contained"
              className="bg-[#01B14F] md:min-w-[100px] max-w-[200px] focus:bg-[#01b14f] hover:bg-[#01B14F] mx-[10px]"
              onClick={() => {
                addNewTopic({ restaurant_id, restaurant_topic_name });
                setAddTopicState(false);
                setRestaurant_topic_name("");
              }}
            >
              ยืนยัน
            </Button>
            <Button
              key={"Cancel"}
              variant="contained"
              onClick={() => {
                setAddTopicState(false);
              }}
              className="bg-[#01B14F] md:min-w-[100px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F] mx-[10px]"
            >
              ยกเลิก
            </Button>
          </div>
        </div>
      )}
      <div className="flex justify-center my-[20px]">
        <Button
          variant="contained"
          className="bg-[#01B14F] md:min-w-[200px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F] z-0"
          onClick={() => {
            setAddTopicState(true);
          }}
        >
          เพิ่มหมวดหมู่
          <AddIcon className="text-[18px]" />
        </Button>
      </div>
      <div>
        {/* Add menu form */}
        {addMenuState == true && (
          <div className="w-full">
            <div className="flex justify-center flex-col items-center w-[300px] h-[auto] bg-[white] shadow-xl border-2 border-[#797979] absolute top-[20%]  left-[50%] translate-x-[-50%] z-10 p-[10px] rounded-xl">
              <div className="w-full flex justify-end">
                <button
                  className="flex justify-end text-[24px]"
                  onClick={() => {
                    setAddMenuState(false);
                  }}
                >
                  <CloseIcon className="text-[34px] text-[white] font-bold bg-[#bd3030] rounded-[50%] mr-[-30px] mt-[-15px]" />
                </button>
              </div>
              <div className="text-[24px] font-bold my-[20px]">เพิ่มเมนู</div>
              <img
                src={
                  imagePreviewUrl
                    ? imagePreviewUrl
                    : "https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-CYWDRU6BKEMXLN/hero/ed785010be5c4d7084d95932bc4f85af_1696785901964057899.webp"
                }
                className="max-w-[200px] h-[150px] border-2 border-black object-contain mb-[15px] bg-white"
              />
              <div className="flex justify-center items-center">
                <input
                  type="file"
                  onChange={handleUploadImage}
                  className="text-[10px]"
                />
              </div>
              <TextField
                label="ชื่อเมนู"
                color="success"
                className=" bg-[#F0F0F0] w-[90%] h-[56px] my-[10px]"
                focused
                value={menu_name}
                onChange={(v) => {
                  setMenu_Name(v.target.value);
                }}
              />
              <TextField
                label="ราคา"
                color="success"
                className=" bg-[#F0F0F0] w-[90%] h-[56px] my-[10px]"
                focused
                type="number"
                value={menu_price}
                onChange={(v) => {
                  setMenu_Price(v.target.value);
                }}
              />
              <FormControl
                variant="filled"
                focused
                color="success"
                sx={{ m: 1, minWidth: 200 }}
                className="w-[90%] focus:text-[green] rounded-lg border-2"
              >
                <InputLabel
                  focused
                  className="focus:text-[green] hover:text-[green] "
                >
                  ประเภทของอาหาร
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={menu_catagory}
                  onChange={handleChange}
                  className="focus:text-[green]"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"อาหารตามสั่ง"}>อาหารตามสั่ง</MenuItem>
                  <MenuItem value={"อาหารอีสาน"}>อาหารอีสาน</MenuItem>
                  <MenuItem value={"อาหารเส้น"}>อาหารเส้น</MenuItem>
                  <MenuItem value={"พิซซ่า"}>พิซซ่า</MenuItem>
                  <MenuItem value={"ฟาสต์ฟู๊ด"}>ฟาสต์ฟู๊ด</MenuItem>
                  <MenuItem value={"ไก่ทอด"}>ไก่ทอด</MenuItem>
                  <MenuItem value={"ชา กาแฟ"}>ชา กาแฟ</MenuItem>
                  <MenuItem value={"ชานมไข่มุก"}>ชานมไข่มุก</MenuItem>
                  <MenuItem value={"ทานเล่น/ขนมขบเคี้ยว"}>
                    ทานเล่น/ขนมขบเคี้ยว
                  </MenuItem>
                  <MenuItem value={"ข้าวหน้า"}>ข้าวหน้า</MenuItem>
                  <MenuItem value={"เบเกอรี่"}>เบเกอรี่</MenuItem>
                  <MenuItem value={"อาหารทะเล"}>อาหารทะเล</MenuItem>
                  <MenuItem value={"ซูชิ"}>ซูชิ</MenuItem>
                  <MenuItem value={"ยำ"}>ยำ</MenuItem>
                  <MenuItem value={"ผลไม้"}>ผลไม้</MenuItem>
                  <MenuItem value={"ปิ้งย่าง/บาร์บีคิว"}>
                    ปิ้งย่าง/บาร์บีคิว
                  </MenuItem>
                  <MenuItem value={"ข้าวมันไก่"}>ข้าวมันไก่</MenuItem>
                  <MenuItem value={"โยเกิร์ต/ไอศกรีม"}>
                    โยเกิร์ต/ไอศกรีม
                  </MenuItem>
                  <MenuItem value={"น้ำผลไม้/สมูทตี้"}>
                    น้ำผลไม้/สมูทตี้
                  </MenuItem>
                  <MenuItem value={"เครื่องดื่ม"}>เครื่องดื่ม</MenuItem>
                  <MenuItem value={"ท๊อปปิ้ง"}>ท๊อปปิ้ง</MenuItem>
                  <MenuItem value={"สเต็ก"}>สเต็ก</MenuItem>
                  <MenuItem value={"อาหารสุขภาพ"}>อาหารสุขภาพ</MenuItem>
                </Select>
              </FormControl>
              <div className="flex flex-row gap-[15px]">
                <Button
                  variant="contained"
                  className="bg-[#01B14F] md:min-w-[100px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F] z-0 my-[10px]"
                  onClick={() => {
                    console.log({
                      menu_name,
                      menu_price,
                      menu_catagory,
                      restaurant_topic_id,
                      owner_id,
                    });

                    addMenu({
                      menu_name,
                      menu_price,
                      menu_catagory,
                      restaurant_topic_id,
                      owner_id,
                      imageBase64,
                      lastnameImage,
                    });
                    console.log(restaurant_topic_id);

                    setMenu_Name("");
                    setMenu_Price("");
                    setMenu_Catagory("");
                    setAddMenuState(false);
                    setImagePreviewUrl(
                      "https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-CYWDRU6BKEMXLN/hero/ed785010be5c4d7084d95932bc4f85af_1696785901964057899.webp"
                    );
                  }}
                >
                  เพิ่มเมนู
                </Button>
                <Button
                  variant="contained"
                  className="bg-[#01B14F] md:min-w-[100px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F] z-0 my-[10px]"
                  onClick={() => {
                    setMenu_Name("");
                    setMenu_Price("");
                    setMenu_Catagory("");
                    setAddMenuState(false);
                  }}
                >
                  ยกเลิก
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row flex-wrap justify-center bg-slate-300">
          {resTopicArray?.map(
            (item: {
              restaurant_topic_id: string;
              restaurant_topic_name: string;
            }) => {
              return (
                <Button
                  key={item.restaurant_topic_id}
                  variant="contained"
                  className="bg-[#205f3c] md:min-w-[80px] max-w-[400px] focus:bg-[#01B14F] hover:bg-[#01B14F] z-0 my-[10px] mr-[10px]"
                  onClick={() => {
                    const data = {
                      restaurant_topic_id: item.restaurant_topic_id,
                    };
                    console.log(data);
                    const newData = data.restaurant_topic_id;
                    console.log(newData, "newData  ");
                    setRestaurant_topic_id(item.restaurant_topic_id);
                    setResTopic(item.restaurant_topic_id);
                    console.log(restaurant_topic_id);
                    console.log(resTopic);

                    getMenus(data);
                  }}
                >
                  {item.restaurant_topic_name}
                </Button>
              );
            }
          )}
        </div>
        <div>
          <div className="w-full">
            <div className=" bg-[white] h-[80px] grid grid-cols-5 mx-[10px] items-center justify-items-center">
              <div className="w-full flex justify-center items-center h-[100%]">
                รูปอาหาร
              </div>
              <div className="w-full flex justify-center items-center border-x-2 h-[100%]">
                ชื่ออาหาร
              </div>
              <div className="w-full flex justify-center items-center h-[100%]">
                ราคา
              </div>
              <div className="w-full flex justify-center items-center border-x-2 h-[100%]">
                ประเภทอาหาร
              </div>
              <Button
                variant="contained"
                className="bg-[#01B14F] md:min-w-[80px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F] z-0 my-[10px] mr-[10px]"
                onClick={() => {
                  if (restaurant_topic_id == "") {
                    console.log("NOOO");
                    console.log(restaurant_topic_id);
                  } else {
                    setAddMenuState(true);
                    console.log(restaurant_topic_id);
                  }
                }}
              >
                เพิ่มเมนู
                <AddIcon className="text-[18px]" />
              </Button>
            </div>
          </div>
          {resMenus?.map(
            (item: {
              menu_image_url: string;
              menu_name: string;
              price: string;
              food_catagory: string;
              menu_image_id: string;
              menu_id: string;
            }) => {
              return (
                <div className=" grid grid-cols-5 gap-1 items-center justify-items-center mx-[10px]">
                  <div className="w-full bg-slate-200 mx-[3px] flex items-center justify-center mb-[4px] rounded-l-lg overflow-hidden">
                    <img
                      className="p-[10px] max-w-[100px] max-h-[100px] bg-cover"
                      src={`data:image/png;base64,${item.menu_image_url}`}
                      alt="menu-image"
                    />
                  </div>
                  <div className="w-full h-[100px] bg-slate-200 mx-[3px] flex items-center justify-center mb-[4px] ">
                    {item.menu_name}
                  </div>
                  <div className="w-full h-[100px] bg-slate-200 mx-[3px] flex items-center justify-center mb-[4px]">
                    {item.price}
                  </div>
                  <div className="w-full h-[100px] bg-slate-200 mx-[3px] flex items-center justify-center mb-[4px] rounded-r-lg">
                    {item.food_catagory}
                  </div>
                  <div className="w-full h-[100px] bg-slate-200 mx-[3px] flex flex-col items-center justify-center mb-[4px] rounded-r-lg overflow-hidden">
                    <Button
                      variant="contained"
                      className="bg-[#c43232] md:min-w-[80px] max-w-[400px] focus:bg-[red] hover:bg-[#d14f4f] z-0 my-[5px]"
                      onClick={() => {
                        const data = {
                          menu_image_id: item.menu_image_id,
                          menu_id: item.menu_id,
                        };
                        deleteMenu(data);
                      }}
                    >
                      ลบ
                    </Button>
                  </div>
                </div>
              );
            }
          )}
          {restaurant_topic_id !== "" && (
            <div className="flex justify-center">
              <Button
                variant="contained"
                className="bg-[#01B14F] md:min-w-[80px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F] z-0 my-[10px] mr-[10px]"
                onClick={() => {
                  if (restaurant_topic_id == "") {
                    console.log(restaurant_topic_id);
                  } else {
                    const data = {
                      restaurant_topic_id: restaurant_topic_id,
                    };
                    deleteTopic(data);
                  }
                  setRestaurant_topic_id("");
                  setResTopic("");
                  getMenus(resTopic);
                }}
              >
                ลบหมวดหมู่นี้
                <DeleteIcon className="text-[18px]" />
              </Button>
            </div>
          )}
        </div>
        {/* {resTopicArray?.map((item) => {
          //   console.log(item.restaurant_topic_id);
          return (
            <div
              className="flex flex-col justify-between p-[20px] border-2 rounded-lg mb-[10px]"
              key={item.restaurant_topic_id}
            >
              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-center items-center font-bold text-[18px] mb-[20px]">
                  {item.restaurant_topic_name}
                </div>
                <div className="flex">
                  <Button
                    variant="contained"
                    className="bg-[#01B14F] md:min-w-[200px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F] z-0 text-[10px]"
                    onClick={() => {
                      // console.log(restaurant_topic_id);
                      // console.log(resMenus);
                    }}
                  >
                    ดูรายการเมนู
                  </Button>
                  <Button
                    variant="contained"
                    className="bg-[#01B14F] md:min-w-[200px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F] z-0 text-[10px]"
                    onClick={() => {
                      setRestaurant_topic_id(item.restaurant_topic_id);
                      setAddMenuState(true);
                    }}
                  >
                    เพิ่มเมนู
                  </Button>
                </div>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default MenuList;
