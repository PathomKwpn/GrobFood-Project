import axios from "axios";
import React, { useEffect, useState } from "react";
import { GROBFOOD_USER_URL } from "../../../util/constants/constant";
import RestaurantCard from "./Restaurant-Card/RestaurantCard";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";

const OwnerContainer = () => {
  const [haveStore, setHaveStore] = useState(false);
  const [createState, setCreateState] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  //OWNER
  const getOwner = localStorage.getItem("user");
  const ownerInfo = JSON.parse(getOwner);
  const owner_id = ownerInfo.id;
  const dataOwner: any = {
    owner_id: owner_id,
  };
  //RES_IMAGE
  const [imgBase64, setImgBase64] = useState("");
  //API
  useEffect(() => {
    const onLogin = async (data: any) => {
      console.log(data);
      const response = await axios.post(
        `${GROBFOOD_USER_URL}/getownerstore`,
        data
      );
      console.log("response", response);
      if (response.data.success) {
        console.log("login success");
        setHaveStore(true);

        setImgBase64(response.data.image);
      } else {
        console.log("err");
      }
    };
    onLogin(dataOwner);
  }, []);

  const haddleSubmit = (event: any) => {
    event.preventDefault();
  };

  const addStoreBtn = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/addstore`, data);
    console.log("response", response);
    if (response.data.success) {
      console.log(response.data);

      console.log("success");
      console.log(imageBase64);

      console.log(lastnameImage);
    } else {
    }
  };

  //INPUT
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState("");
  const [restaurant_name, setRestaurant_name] = useState("");
  const [address, setRestaurant_address] = useState("");
  const [restaurant_catagory, setRestaurant_catagory] = useState("");
  const [open_time, setRestaurant_openTime] = useState("");
  const [close_time, setRestaurant_closeTime] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [lastnameImage, setLastnameImage] = useState("");
  //IMAGE UPLOAD
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
    } else {
    }
    console.log(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFile(file);

      setLastnameImage(file.type.split("/").pop());
      console.log(reader.result);

      setImageBase64(reader.result);
      setImagePreviewUrl(reader.result);
    };
  };

  const PreviewImage = ({ data }: any) => (
    <img
      src={`data:image/png;base64,${data}`}
      className=" bg-cover w-[150px] h-[150px]"
      alt=""
    />
  );
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-[60px]">
        <div className="text-[32px] font-bold text-[#484848] mb-[30px]">
          Your Restaurants
        </div>
        {createState == true && (
          <div className=" absolute w-[95%] h-[auto] bg-[#079F4E] px-[20px] pb-[40px] z-40 rounded-md mt-[50%] md:mt-[25%] lg:mt-[20%] xl:mt-[10%] md:max-w-[800px]">
            <div className="w-full flex justify-end">
              <button
                className="flex justify-end text-[24px]"
                onClick={() => {
                  setCreateState(!createState);
                }}
              >
                <CloseIcon className="text-[34px] text-[white] font-bold bg-[#bd3030] rounded-[50%] mr-[-30px] mt-[-15px]" />
              </button>
            </div>

            <div className="bg-[white] p-[40px] rounded-xl">
              <div className="flex justify-center mt-[5px] text-[24px] font-bold text-[#484848] mb-[20px]">
                Create Store
              </div>
              <div className="flex flex-col justify-center items-center">
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
                <div className="mt-[20px] ">
                  <div className="flex flex-col gap-7 md:min-w-[400px]">
                    <TextField
                      label="ชื่อร้านของคุณ"
                      variant="filled"
                      color="success"
                      focused
                      value={restaurant_name}
                      size="small"
                      className="bg-[white] rounded-lg"
                      onChange={(v) => {
                        setRestaurant_name(v.target.value);
                      }}
                    />
                    <TextField
                      id="partner_lastname"
                      label="ที่อยู่ร้านของคุณ"
                      variant="filled"
                      color="success"
                      focused
                      size="small"
                      value={address}
                      className="bg-[white] rounded-lg"
                      onChange={(v) => {
                        setRestaurant_address(v.target.value);
                      }}
                    />

                    <TextField
                      label="ประเภทของร้านของคุณ"
                      variant="filled"
                      color="success"
                      focused
                      size="small"
                      value={restaurant_catagory}
                      className="bg-[white] rounded-lg"
                      onChange={(v) => {
                        setRestaurant_catagory(v.target.value);
                      }}
                    />
                    <TextField
                      id="time"
                      label="เวลาเปิดร้าน"
                      type="time"
                      className="bg-white"
                      defaultValue="07:30"
                      onChange={(v) => {
                        setRestaurant_openTime(v.target.value);
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                    <TextField
                      id="time"
                      label="เวลาปิดร้าน"
                      type="time"
                      defaultValue="07:30"
                      onChange={(v) => {
                        setRestaurant_closeTime(v.target.value);
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                    <Button
                      variant="contained"
                      className="bg-[#01B14F] md:min-w-[200px] max-w-[400px] focus:bg-[#01B14F] hover:bg-[#01B14F]"
                      onClick={() => {
                        addStoreBtn({
                          owner_id,
                          restaurant_name,
                          address,
                          open_time,
                          close_time,
                          restaurant_catagory,
                          imageBase64,
                          lastnameImage,
                        });
                        console.log(imageBase64);
                      }}
                    >
                      สร้างร้านค้า
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!haveStore == true && (
          <div className="flex justify-center w-[90%] md: h-[auto] bg-[#ffffff] rounded-2xl lg:max-w-[900px]  shadow-lg min-h-[500px] ">
            <div className="flex flex-col p-[40px] justify-center items-center m-[10px] gap-6">
              <div>
                <div className="text-[#484848] text-[24px] font-bold">
                  "ไม่พบร้านค้าของคุณ"
                </div>
              </div>
              <div className=" w-[90%] flex justify-center lg:max-w-[900px] mt-[20px] mb-[10px] ">
                <Button
                  variant="contained"
                  className="bg-[#009C49]"
                  endIcon={<AddIcon />}
                  onClick={() => {
                    setCreateState(true);
                  }}
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        )}
        {haveStore == true && (
          <div className="flex flex-col items-center justify-center w-[90%] md: h-[auto] bg-[#ffffff] rounded-2xl lg:max-w-[900px]  shadow-lg min-h-[500px] ">
            <div className="flex flex-col  p-[40px] justify-center items-center m-[10px] gap-6 w-full">
              {/* md:grid md:grid-cols-2 lg:grid-cols-3 */}
              <div className="flex justify-center w-full">
                <RestaurantCard
                  ResName={"KFC"}
                  ResCatagory={"ไก่ทอด"}
                  ResDetail={"เปิด-ปิด: 8.00-19.00"}
                  ResImage={imgBase64}
                />
              </div>
            </div>

            {/* <div className=" w-[90%] flex justify-center lg:max-w-[900px] mt-[20px] mb-[10px] ">
              <Button
                variant="contained"
                className="bg-[#009C49]"
                endIcon={<AddIcon />}
              >
                Add
              </Button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerContainer;
