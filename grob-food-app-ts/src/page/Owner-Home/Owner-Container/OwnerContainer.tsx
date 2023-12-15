import axios from "axios";
import { useEffect, useState } from "react";
import { GROBFOOD_USER_URL } from "../../../util/constants/constant";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  AlertTitle,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const OwnerContainer = () => {
  const nevigate = useNavigate();
  const [haveStore, setHaveStore] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [createState, setCreateState] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  //OWNER
  const getOwner: any = localStorage.getItem("user");
  const ownerInfo = JSON.parse(getOwner);
  const owner_id = ownerInfo.id;
  const dataOwner: any = {
    owner_id: owner_id,
  };
  //RES_DATA
  const [resName, setResName] = useState("");
  const [resCatagory, setResCatagory] = useState("");
  const [resDetail, setResDetail] = useState("");

  //RES_IMAGE
  const [imgBase64, setImgBase64] = useState("");
  //API
  const onLogin = async (data: any) => {
    console.log(data);
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/getownerstore`,
      data
    );
    console.log("response", response);
    if (response.data.success) {
      setHaveStore(true);
      console.log(response.data.data[0]);
      setResName(response.data.data[0].restaurant_name);
      setResCatagory(response.data.data[0].restaurant_catagory);
      setResDetail(
        "เปิด " +
          response.data.data[0].open_time +
          " - ปิด " +
          response.data.data[0].close_time
      );
      setImgBase64(response.data.image);
    } else {
      console.log("err");
    }
  };
  useEffect(() => {
    onLogin(dataOwner);
  }, []);

  // const haddleSubmit = (event: any) => {
  //   event.preventDefault();
  // };

  const addStoreBtn = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/addstore`, data);
    console.log("response", response);
    if (response.data.success) {
      console.log(response.data);
      onLogin(dataOwner);
      console.log("success");
    } else {
    }
  };

  //INPUT
  // const [file, setFile] = useState({});
  // const [fileName, setFileName] = useState("");
  const [restaurant_name, setRestaurant_name] = useState("");
  const [address, setRestaurant_address] = useState("");
  const [restaurant_catagory, setRestaurant_catagory] = useState("");
  const [open_time, setRestaurant_openTime] = useState("");
  const [close_time, setRestaurant_closeTime] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [lastnameImage, setLastnameImage] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  //IMAGE UPLOAD
  const handleUploadImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
    } else {
    }

    const reader: any = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      // setFile(file);
      setLastnameImage(file.type.split("/").pop());
      setImageBase64(reader.result);
      setImagePreviewUrl(reader.result);
    };
  };
  const handleChange = (event: any) => {
    setRestaurant_catagory(event.target.value);
  };
  const PreviewImage = ({ data }: any) => (
    <CardMedia
      className="bg-cover"
      sx={{ height: 140 }}
      image={`data:image/png;base64,${data}`}
      title="green iguana"
    />
  );
  const deleteStore = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/deletestore`, data);

    if (response.data.success) {
      console.log("Delete Successfull");
      onLogin(dataOwner);
    } else {
      console.log("ERROR");
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-[60px]">
        <div className="text-[32px] font-bold text-[white] md:text-[40px] mb-[30px]">
          Your Restaurants
        </div>
        {createState == true && (
          <div className=" absolute w-[95%] h-[auto] bg-[#079F4E] px-[20px] pb-[40px] z-40 rounded-md mt-[85%] md:mt-[40%] lg:mt-[20%] xl:mt-[20%] md:max-w-[800px]">
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
                รูปโปรไฟล์ร้านของคุณ
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
                      label="latitude ของร้านคุณ"
                      placeholder="(เช่น 13.756331)"
                      variant="filled"
                      color="success"
                      focused
                      size="small"
                      value={latitude}
                      className="bg-[white] rounded-lg"
                      onChange={(v) => {
                        setLatitude(v.target.value);
                      }}
                    />
                    <TextField
                      label="longtitude ของร้านคุณ"
                      placeholder="(เช่น 100.501762)"
                      variant="filled"
                      color="success"
                      focused
                      size="small"
                      value={longitude}
                      className="bg-[white] rounded-lg"
                      onChange={(v) => {
                        setLongitude(v.target.value);
                      }}
                    />

                    <FormControl
                      variant="filled"
                      focused
                      color="success"
                      sx={{ minWidth: 200 }}
                      className="w-[100%] focus:text-[green] rounded-lg border-2"
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
                        value={restaurant_catagory}
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
                        <MenuItem value={"อาหารทะเล"}>อาหารทะเล</MenuItem>
                        <MenuItem value={"ทานเล่น/ขนมขบเคี้ยว"}>
                          ทานเล่น/ขนมขบเคี้ยว
                        </MenuItem>
                        <MenuItem value={"ข้าวหน้า"}>ข้าวหน้า</MenuItem>
                        <MenuItem value={"เบเกอรี่"}>เบเกอรี่</MenuItem>
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
                        <MenuItem value={"สเต็ก"}>สเต็ก</MenuItem>
                        <MenuItem value={"อาหารสุขภาพ"}>อาหารสุขภาพ</MenuItem>
                      </Select>
                    </FormControl>
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
                          latitude,
                          longitude,
                        });
                        setRestaurant_name("");
                        setRestaurant_address("");
                        setRestaurant_openTime("");
                        setRestaurant_closeTime("");
                        setRestaurant_catagory("");
                        setLatitude("");
                        setLongitude("");
                        setImagePreviewUrl(null);
                        setCreateState(!createState);
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
        {confirmDelete == true && (
          <div className=" absolute top-[200px]">
            <Alert severity="error">
              <AlertTitle className="text-[18px] mr-[30px]">
                คุณยืนยันใช่ไหมที่จะลบร้านนี้
              </AlertTitle>
              <div className="flex justify-center mr-[30px]">
                <Button
                  variant="contained"
                  className="bg-[#01B14F] md:min-w-[100px] max-w-[400px] focus:bg-[#01B14F] hover:bg-[#01B14F] "
                  onClick={() => {
                    deleteStore(dataOwner);
                    setConfirmDelete(false);
                    setHaveStore(false);
                  }}
                >
                  ยืนยัน
                </Button>
                <Button
                  variant="contained"
                  className="bg-[#01B14F] md:min-w-[100px] max-w-[200px] focus:bg-[#01B14F] hover:bg-[#01B14F] ml-[10px]"
                  onClick={() => {
                    onLogin(dataOwner);
                    setConfirmDelete(false);
                  }}
                >
                  ยกเลิก
                </Button>
              </div>
            </Alert>
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
                <Card className="max-w-[230px] w-full flex flex-col justify-center shadow-md rounded-xl border-2">
                  <PreviewImage data={imgBase64} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {resName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {resCatagory}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {resDetail}
                    </Typography>
                  </CardContent>
                  <CardActions className="flex justify-center">
                    <Button
                      className=" bg-[#009C49] text-[white] border-[1px] border-solid border-gray-400 shadow-md"
                      size="small"
                      onClick={() => {
                        nevigate("/ownerstore-detail");
                      }}
                    >
                      ดูข้อมูล
                    </Button>
                    <Button
                      className=" bg-[#c63333] text-[white] border-[1px] border-solid border-gray-400 shadow-md"
                      size="small"
                      onClick={() => {
                        setConfirmDelete(true);
                      }}
                    >
                      ลบ
                    </Button>
                  </CardActions>
                </Card>
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
