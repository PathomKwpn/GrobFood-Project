import { useEffect, useState } from "react";
import { NavbarAdmin } from "./component/index";
import LoginAdmin from "./LoginAdmin";
import { useToken } from "../../util/token/token";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ListAltIcon from "@mui/icons-material/ListAlt";
import axios from "axios";
const AdminPage = () => {
  const {
    saveTokentoLocalStorage,
    saveUsertoLacalStorage,
    createCarttoLocalStorage,
    updateToken,
  } = useToken();
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    console.log("NO USER");

    return (
      <LoginAdmin
        setUser={saveUsertoLacalStorage}
        setToken={saveTokentoLocalStorage}
        createCart={createCarttoLocalStorage}
      />
    );
  }
  // const [dateTimestamp, setDateTimestamp] = useState(+new Date());
  const [viewState, setViewState] = useState<"store" | "coupon">("store");
  const [storeList, setStoreList] = useState([]);
  const [filterStore, setFilteredStore] = useState(storeList);

  const [couponList, setCouponList] = useState([]);
  const [filterCoupon, setFilterCoupon] = useState(couponList);
  // console.log(dateTimestamp, "DATETIME");

  const [addCouponState, setCouponState] = useState<boolean>(false);
  //CouponINFO
  const [coupon_name, setCouponName] = useState<string>("");
  const [start_day, setStartDay] = useState<string>("");
  const [start_month, setStartMonth] = useState<string>("");
  const [start_year, setStartYear] = useState<string>("");
  const [expire_day, setExpireDay] = useState<string>("");
  const [expire_month, setExpireMonth] = useState<string>("");
  const [expire_year, setExpireYear] = useState<string>("");
  const [discount_value, setDiscountValue] = useState<number>();
  const [discount_type, setDiscountType] = useState<string>("");
  const [min_totalprice, setMinTotalPrice] = useState<number>();
  const [max_discount, setMaxDiscount] = useState<number>();

  const handleFilter = (e: any) => {
    const value = e.target.value;
    console.log(value);

    const filtered = storeList.filter(
      (store: {
        address: string;
        close_time: string;
        latitude: string;
        longitude: string;
        open_time: string;
        owner_id: string;
        regis_date: string;
        restaurant_catagory: string;
        restaurant_credit: 0;
        restaurant_id: string;
        restaurant_name: string;
        score: string;
        status: string;
        update_by: string;
        update_date: string;
      }) => store.restaurant_name.includes(value)
    );

    setFilteredStore(filtered);
  };
  const handleChange = (event: any) => {
    setDiscountType(event.target.value);
  };
  const handleFilterCoupon = (e: any) => {
    const value = e.target.value;
    console.log(value);

    const filtered = couponList.filter(
      (coupon: {
        coupon_id: string;
        coupon_name: string;
        create_date: string;
        discount_type: string;
        discount_value: string;
        expire_date: string;
        expire_timestamp: number;
        max_discount: string;
        min_totalprice: string;
        start_date: string;
        status: null;
      }) => coupon.coupon_name.includes(value)
    );

    setFilterCoupon(filtered);
  };
  const getStoreList = async () => {
    const response = await axios.get(`${GROBFOOD_USER_URL}/getstorelist`);
    if (response.data.success) {
      console.log(response.data);
      setStoreList(response.data.data);
      setFilteredStore(response.data.data);
    } else {
      console.log("err");
    }
  };
  const getCouponList = async () => {
    const response = await axios.get(`${GROBFOOD_USER_URL}/getcouponlist`);
    if (response.data.success) {
      let data = response.data.data;
      for (let i = 0; i < data.length; i++) {
        data[i].expire_timestamp = +new Date(data[i].expire_date);
        console.log("forloop");
      }
      console.log(data);
      setCouponList(data);
      setFilterCoupon(data);
    } else {
      console.log("err");
    }
  };
  const addCoupon = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/addnewcoupon`,
      data
    );
    if (response.data.success) {
      console.log(response.data);
      getCouponList();
    } else {
      console.log("err");
    }
  };
  const updateStatusStore = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/updatestatusstore`,
      data
    );
    if (response.data.success) {
      console.log(response.data);
      getStoreList();
    } else {
      console.log("err");
    }
  };
  const deleteStore = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/deletestore`, data);
    if (response.data.success) {
      console.log(response.data);
      getStoreList();
    } else {
      console.log("err");
    }
  };
  useEffect(() => {
    getStoreList();
    getCouponList();
  }, []);
  console.log(storeList);

  return (
    <div className=" bg-[#01B14F] w-full min-h-[100vh] h-[auto]">
      <NavbarAdmin />
      <div className="flex flex-row justify-center my-[24px] mb-[30px] w-[80%] m-auto">
        <Button
          variant="contained"
          onClick={() => {
            setViewState("store");
            updateToken();
          }}
          className="bg-[white] min-w-[150px] md:min-w-[200px] max-w-[400px] focus:bg-[white] hover:bg-[white] text-[#4e4e4e] mx-[3px] md:mx-[16px]"
        >
          รายการร้านค้า
          <ListAltIcon className="ml-[6px] text-[#707070]" />
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setViewState("coupon");
            updateToken();
          }}
          className="bg-[white] min-w-[150px] md:min-w-[200px] max-w-[400px] focus:bg-[white] hover:bg-[white] py-[10px] text-[black] mx-[3px] md:mx-[16px]"
        >
          รายการคูปองส่วนลด
          <ListAltIcon className="ml-[6px] text-[#707070]" />
        </Button>
      </div>
      {viewState == "store" && (
        <div className="h-[auto] max-w-[800px] flex flex-col justify-center m-[auto] p-[16px] rounded-xl shadow-md bg-white">
          <div className="text-[24px] font-bold flex justify-center items-center my-[30px] bg-[#01B14F] max-w-[500px] m-[auto] p-[12px] px-[24px] rounded-lg text-[white]">
            รายการร้านค้า
            <ListAltIcon className="ml-[6px] text-[#00000]" />
          </div>
          <div className="w-full flex justify-center items-center mb-[12px]">
            <span>ค้นหาร้าน :</span>
            <input
              type="text"
              placeholder="ค้นหาร้านอาหาร"
              onChange={handleFilter}
              className=" bg-[#F7F7F7] ml-[10px] max-w-[150px] md:max-w-[200px] border-[2px] focus:border-black rounded-lg p-1"
            />
          </div>
          <div className="flex justify-center">
            <div className="bg-white w-[600px] h-[800px] overflow-scroll border-[1px] border-[#01B14F]">
              <div className="max-w-[800px]">
                <div className="w-full ">
                  <div className=" w-full bg-slate-100 h-[80px] flex flex-nowrap items-center justify-items-center gap-1  ">
                    <div className=" bg-white  min-w-[100px] flex justify-center items-center h-[100%]">
                      ชื่อร้าน
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      ประเภทอาหาร
                    </div>

                    <div className=" bg-white min-w-[100px] flex justify-center items-center  h-[100%]">
                      คะแนนร้าน
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      เวลาเปิด-ปิด
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      วันที่สร้างร้าน
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      สถานะร้าน
                    </div>
                  </div>
                </div>

                {filterStore?.map((item: any) => {
                  let createDate = new Date(item.regis_date);
                  let regisDay = createDate.getDate();
                  let regisMonth = createDate.getMonth();
                  let regisYear = createDate.getFullYear();
                  return (
                    <div
                      className=" flex flex-nowrap items-center justify-items-center gap-1 "
                      key={item.restaurant_id}
                    >
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] px-[5px] flex items-center justify-center mb-[4px] ">
                        {item.restaurant_name}
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.restaurant_catagory}
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.score}
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex flex-col items-center justify-center mb-[4px]">
                        <span>เปิด :{item.open_time}</span>
                        <span>ปิด :{item.close_time}</span>
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {regisDay}/{regisMonth}/{regisYear}
                      </div>
                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex flex-col items-center justify-center mb-[4px] overflow-hidden">
                        {item.status == "Allow" && (
                          <Button
                            variant="contained"
                            className="bg-[#01B14F] md:min-w-[80px] max-w-[400px] shadow-sm focus:bg-[#01B14F] hover:bg-[#01B14F] z-0 my-[5px]"
                            onClick={() => {
                              const data: any = {
                                restaurant_id: item.restaurant_id,
                                status: item.status,
                              };
                              updateStatusStore(data);
                            }}
                          >
                            อนุญาติ
                          </Button>
                        )}
                        {item.status == "Not allowed" && (
                          <Button
                            variant="contained"
                            className="bg-[#c43232] md:min-w-[80px] max-w-[400px] shadow-sm focus:bg-[#c43232] hover:bg-[#c43232] z-0 my-[5px]"
                            onClick={() => {
                              const data: any = {
                                restaurant_id: item.restaurant_id,
                                status: item.status,
                              };
                              updateStatusStore(data);
                            }}
                          >
                            ถูกปิดกั้น
                          </Button>
                        )}
                      </div>

                      <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex flex-col items-center justify-center mb-[4px] overflow-hidden">
                        <Button
                          variant="contained"
                          className="bg-[#c43232] md:min-w-[80px] max-w-[400px] focus:bg-[red] hover:bg-[#d14f4f] z-0 my-[5px]"
                          onClick={() => {
                            const owner_id: any = {
                              owner_id: item.owner_id,
                            };
                            deleteStore(owner_id);
                          }}
                        >
                          ลบ
                        </Button>
                      </div>
                      {/* <div className=" min-w-[100px] h-[100px] bg-slate-200 text-[12px] flex flex-col items-center justify-center mb-[4px] overflow-hidden">
                        <Button
                          variant="contained"
                          className="bg-[#c43232] md:min-w-[80px] max-w-[400px] focus:bg-[red] hover:bg-[#d14f4f] z-0 my-[5px]"
                          onClick={() => {
                            const owner_id: any = {
                              owner_id: item.owner_id,
                            };
                            deleteStore(owner_id);
                          }}
                        >
                          ลบ
                        </Button>
                      </div> */}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {viewState == "coupon" && (
        <div className="h-[auto] max-w-[800px] flex flex-col justify-center m-[auto] p-[16px] rounded-xl shadow-md bg-white">
          <div className="text-[24px] font-bold flex justify-center items-center my-[30px] bg-[#01B14F] max-w-[500px] m-[auto] p-[12px] px-[24px] rounded-lg text-[white]">
            รายการคูปองส่วนลด
            <ListAltIcon className="ml-[6px] text-[#00000]" />
          </div>
          <div className="w-full flex justify-center items-center mb-[12px]">
            <span>ค้นหาคูปอง :</span>
            <input
              type="text"
              placeholder="ค้นหาคูปอง"
              onChange={handleFilterCoupon}
              className=" bg-[#F7F7F7] ml-[10px] max-w-[150px] md:max-w-[200px] border-[2px] focus:border-black rounded-lg p-1"
            />
          </div>
          <Button
            variant="contained"
            className="bg-[#01B14F] md:min-w-[80px] shadow-sm max-w-[200px] focus:bg-[#01b14f] hover:bg-[#01B14F] z-0 my-[10px] m-[auto]"
            onClick={() => {
              setCouponState(true);
            }}
          >
            เพิ่มคูปอง
            <AddIcon className="text-[18px]" />
          </Button>
          {addCouponState == true && (
            <div className="w-full">
              <div className="flex justify-center flex-col items-center w-[300px] md:w-[400px] h-[auto] bg-[white] shadow-xl border-2 border-[#797979] absolute top-[20%]  left-[50%] translate-x-[-50%] z-10 p-[10px] rounded-xl">
                <div className="w-full flex justify-end">
                  <button
                    className="flex justify-end text-[24px]"
                    onClick={() => {
                      setCouponState(false);
                    }}
                  >
                    <CloseIcon className="text-[34px] text-[white] font-bold bg-[#bd3030] rounded-[50%] mr-[-30px] mt-[-15px]" />
                  </button>
                </div>
                <div className="text-[24px] font-bold my-[20px]">เพิ่มเมนู</div>

                <TextField
                  label="ชื่อเมนู"
                  color="success"
                  className=" bg-[#F0F0F0] w-[90%] h-[56px] my-[10px]"
                  focused
                  value={coupon_name}
                  onChange={(v) => {
                    setCouponName(v.target.value);
                  }}
                />
                <div className="flex flex-col justify-center mt-[8px]">
                  <p className="pl-[16px]">วันที่เริ่มใช้คูปอง</p>
                  <div className="flex justify-center gap-[2px]">
                    <TextField
                      label="วัน"
                      color="success"
                      className=" bg-[#F0F0F0] w-[28%] h-[56px] my-[10px]"
                      focused
                      type="number"
                      value={start_day}
                      onChange={(v) => {
                        setStartDay(v.target.value);
                      }}
                    />
                    <div className="flex items-center">-</div>
                    <TextField
                      label="เดือน"
                      color="success"
                      className=" bg-[#F0F0F0] w-[28%] h-[56px] my-[10px]"
                      focused
                      type="number"
                      value={start_month}
                      onChange={(v) => {
                        setStartMonth(v.target.value);
                      }}
                    />
                    <div className="flex items-center">-</div>
                    <TextField
                      label="ปี ค.ศ"
                      color="success"
                      className=" bg-[#F0F0F0] w-[28%] h-[56px] my-[10px]"
                      focused
                      type="number"
                      value={start_year}
                      onChange={(v) => {
                        setStartYear(v.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center mt-[8px]">
                  <p className="pl-[16px]">วันที่คูปองหมดอายุ</p>
                  <div className="flex justify-center gap-[2px]">
                    <TextField
                      label="วัน"
                      color="success"
                      className=" bg-[#F0F0F0] w-[28%] h-[56px] my-[10px]"
                      focused
                      type="number"
                      value={expire_day}
                      onChange={(v) => {
                        setExpireDay(v.target.value);
                      }}
                    />
                    <div className="flex items-center">-</div>
                    <TextField
                      label="เดือน"
                      color="success"
                      className=" bg-[#F0F0F0] w-[28%] h-[56px] my-[10px]"
                      focused
                      type="number"
                      value={expire_month}
                      onChange={(v) => {
                        setExpireMonth(v.target.value);
                      }}
                    />
                    <div className="flex items-center">-</div>
                    <TextField
                      label="ปี ค.ศ"
                      color="success"
                      className=" bg-[#F0F0F0] w-[28%] h-[56px] my-[10px]"
                      focused
                      type="number"
                      value={expire_year}
                      onChange={(v) => {
                        setExpireYear(v.target.value);
                      }}
                    />
                  </div>
                </div>
                <TextField
                  label="จำนวนส่วนลด"
                  color="success"
                  placeholder="ex. 5, 10, 100"
                  className=" bg-[#F0F0F0] w-[90%] h-[56px] my-[10px]"
                  focused
                  type="number"
                  value={discount_value}
                  onChange={(v) => {
                    setDiscountValue(Number(v.target.value));
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
                    รูปแบบส่วนลด
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={discount_type}
                    onChange={handleChange}
                    className="focus:text-[green]"
                  >
                    <MenuItem value="baht">ลดเป็นจำนวนบาท ( บาท )</MenuItem>
                    <MenuItem value={"percent"}>ลดเป็นเปอเซ็นต์ ( % )</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="ราคาซื้อสินค้าขั้นต่ำ"
                  color="success"
                  placeholder=""
                  type="number"
                  className=" bg-[#F0F0F0] w-[90%] h-[56px] my-[10px]"
                  focused
                  value={min_totalprice}
                  onChange={(v) => {
                    setMinTotalPrice(Number(v.target.value));
                  }}
                />
                <TextField
                  label="ลดสูงสุด (บาท)"
                  color="success"
                  type="number"
                  placeholder=""
                  className=" bg-[#F0F0F0] w-[90%] h-[56px] my-[10px]"
                  focused
                  value={max_discount}
                  onChange={(v) => {
                    setMaxDiscount(Number(v.target.value));
                  }}
                />
                <div className="flex flex-row gap-[15px]">
                  <Button
                    variant="contained"
                    className="bg-[#01B14F] md:min-w-[100px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F] z-0 my-[10px]"
                    onClick={() => {
                      let start_date =
                        start_year + "-" + start_month + "-" + start_day;
                      let expire_date =
                        expire_year + "-" + expire_month + "-" + expire_day;
                      if (
                        coupon_name &&
                        discount_type &&
                        discount_value &&
                        max_discount &&
                        min_totalprice &&
                        start_day &&
                        start_month &&
                        start_year &&
                        expire_day &&
                        expire_month &&
                        expire_year
                      ) {
                        let data = {
                          coupon_name,
                          start_date,
                          expire_date,
                          discount_value,
                          discount_type,
                          min_totalprice,
                          max_discount,
                        };
                        addCoupon(data);
                        setCouponName("");
                        setStartDay("");
                        setStartMonth("");
                        setStartYear("");
                        setExpireDay("");
                        setExpireMonth("");
                        setExpireYear("");
                        setDiscountValue(0);
                        setMaxDiscount(0);
                        setMinTotalPrice(0);
                        setCouponState(false);
                      } else {
                        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
                      }
                    }}
                  >
                    เพิ่มคูปอง
                  </Button>
                  <Button
                    variant="contained"
                    className="bg-[#01B14F] md:min-w-[100px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F] z-0 my-[10px]"
                    onClick={() => {
                      setCouponState(false);
                    }}
                  >
                    ยกเลิก
                  </Button>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-center">
            <div className="bg-white w-[600px] h-[800px] overflow-scroll border-2 border-black">
              <div className="max-w-[800px]">
                <div className="w-full ">
                  <div className=" bg-slate-100 h-[80px] flex flex-nowrap items-center justify-items-center gap-1  ">
                    <div className=" bg-white  min-w-[100px] flex justify-center items-center h-[100%]">
                      ชื่อคูปอง
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      เริ่มใช้
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      หมดอายุ
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center  h-[100%]">
                      ส่วนลด
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      รูปแบบ
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      ขั้นต่ำ
                    </div>
                    <div className=" bg-white min-w-[100px] flex justify-center items-center h-[100%]">
                      ลดสูงสุด
                    </div>
                  </div>
                </div>
                {filterCoupon?.map((item: any) => {
                  let startDate = new Date(item.start_date);
                  let expireDate = new Date(item.expire_date);
                  let couponStatus;
                  let bgStatus = "bg-[#01B14F]";
                  console.log(expireDate);
                  let startTimestamp = +new Date(item.start_date);
                  let expireTimestamp = +new Date(item.expire_date);
                  // console.log(expireTimestamp, "EXPIRE");
                  let nowTimestamp = +new Date();
                  // console.log(nowTimestamp, "NOW");
                  if (
                    nowTimestamp > expireTimestamp ||
                    nowTimestamp < startTimestamp
                  ) {
                    console.log("ไม่อยู่ในระยะเวลาใช้งานคูปอง");
                    couponStatus = "หมดอายุ";
                    bgStatus = "bg-[#c43232]";
                  } else {
                    couponStatus = "ใช้งานได้";
                  }

                  //StartDate
                  let startDay = startDate.getDate();
                  let startMonth = startDate.getMonth();
                  let startYear = startDate.getFullYear();
                  //ExpireDate
                  let expireDay = expireDate.getDate();
                  let expireMonth = expireDate.getMonth() + 1;
                  let expireYear = expireDate.getFullYear();
                  return (
                    <div
                      className=" flex flex-nowrap items-center justify-items-center gap-1 "
                      key={item.coupon_id}
                    >
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] px-[5px] flex items-center justify-center mb-[4px] ">
                        {item.coupon_name}
                      </div>
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {startDay}/{startMonth}/{startYear}
                      </div>
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {expireDay}/{expireMonth}/{expireYear}
                      </div>
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.discount_value}
                      </div>
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] flex flex-col items-center justify-center mb-[4px]">
                        {item.discount_type}
                      </div>
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.min_totalprice}
                      </div>
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] flex items-center justify-center mb-[4px]">
                        {item.max_discount}
                      </div>
                      <div className=" min-w-[100px] h-[70px] bg-slate-200 text-[12px] flex flex-col items-center justify-center mb-[4px] overflow-hidden">
                        <Button
                          variant="contained"
                          className={
                            " md:min-w-[80px] max-w-[400px] cursor-default z-0 my-[5px] " +
                            bgStatus +
                            " focus:" +
                            bgStatus
                          }
                          onClick={() => {
                            // const data = {
                            //   menu_image_id: item.menu_image_id,
                            //   menu_id: item.menu_id,
                            // };
                          }}
                        >
                          {couponStatus}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
