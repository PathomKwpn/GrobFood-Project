import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { GROBFOOD_USER_URL } from "../../../util/constants/constant";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { AlertTitle } from "@mui/material";
import Alert from "@mui/material/Alert";
import FilledInput from "@mui/material/FilledInput";
import { Link } from "react-router-dom";
const UserRegister = () => {
  const [user_firstname, setUser_FirstName] = useState<string>("");
  const [user_lastname, setUser_LastName] = useState<string>("");
  const [user_ageStr, setUser_AgeStr] = useState<string>("");
  const [user_username, setUser_Username] = useState<string>("");
  const [user_password, setUser_Password] = useState<string>("");
  const [user_phone, setUser_Phone] = useState<string>("");

  const DEFAULT_ALERT = {
    title: "",
    data: "",
    type: "info",
  };
  const [alertStatus, setAlertStatus] = useState<any>(DEFAULT_ALERT);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const haddleSubmit = (event: any) => {
    event.preventDefault();
  };

  const submitRegister = async (data: any) => {
    const response = await axios.post(`${GROBFOOD_USER_URL}/register`, data);

    if (
      user_username == "" ||
      user_firstname == "" ||
      user_lastname == "" ||
      user_password == "" ||
      user_phone == ""
    ) {
      setAlertStatus({
        title: "FAIL",
        data: "กรุณาใส่ข้อมูลให้ครบถ้วน",
        type: "warning",
      });
    } else if (response.data.success) {
      setUser_FirstName("");
      setUser_LastName("");
      setUser_AgeStr("");
      setUser_Username("");
      setUser_Password("");
      setUser_Phone("");
      setAlertStatus({
        title: "SUCCESS",
        data: "REGISTER SUCCESSFUL",
        type: "success",
      });
    } else {
      setAlertStatus({
        title: "FAIL",
        data: response.data.data,
        type: "error",
      });
    }
  };
  return (
    <div className="">
      <div className="absolute top-[40px] md:top-[80px] left-[50%] translate-x-[-50%] w-[350px]">
        {alertStatus.data && (
          <Alert severity={alertStatus.type} className="mb-[40px] ">
            <AlertTitle>{alertStatus.title}</AlertTitle>
            {alertStatus.data} — <strong>check it out!</strong>
          </Alert>
        )}
      </div>
      <div className="flex flex-col items-center w-[100%] sm:max-w-[ุ400px] md:w-[500px] h-[auto] bg-[#FFFFFF] rounded-xl px-[1%] shadow-md ">
        <div className="w-full h-[auto] flex justify-center mt-[40px]">
          <div className="text-[32px] font-bold flex flex-col justify-center text-center md:flex-row gap-2">
            <span className="text-[#009C49]">CUSTOMER</span>{" "}
            <span>REGISTER</span>
          </div>
        </div>
        <form
          onSubmit={haddleSubmit}
          className="w-full p-[20px] flex flex-col justify-center items-center mt-[30px] gap-7"
        >
          <div className="flex flex-col gap-7 md:min-w-[400px]">
            <TextField
              id="firstname"
              label="Firstname"
              variant="filled"
              color="success"
              focused
              value={user_firstname}
              size="small"
              onChange={(v) => {
                setUser_FirstName(v.target.value);
              }}
            />
            <TextField
              label="Lastname"
              variant="filled"
              color="success"
              focused
              size="small"
              value={user_lastname}
              onChange={(v) => {
                setUser_LastName(v.target.value);
              }}
            />
            <TextField
              label="Age"
              type="number"
              variant="filled"
              color="success"
              focused
              size="small"
              value={user_ageStr}
              onChange={(v) => {
                setUser_AgeStr(v.target.value);
              }}
            ></TextField>
            <TextField
              label="Username"
              variant="filled"
              color="success"
              focused
              size="small"
              value={user_username}
              onChange={(v) => {
                setUser_Username(v.target.value);
              }}
            />
            <FormControl
              sx={{ width: "25ch" }}
              variant="filled"
              color="success"
              focused
              className="w-full"
              size="small"
            >
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={showPassword ? "text" : "password"}
                value={user_password}
                onChange={(v) => {
                  setUser_Password(v.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={haddleSubmit}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <TextField
              label="Phone"
              type="tel"
              helperText="Enter your phone number"
              variant="filled"
              color="success"
              focused
              value={user_phone}
              size="small"
              onChange={(v) => {
                setUser_Phone(v.target.value);
              }}
            />
          </div>
          <Button
            onClick={() => {
              const user_age: number = Number(user_ageStr);
              submitRegister({
                user_firstname,
                user_lastname,
                user_age,
                user_phone,
                user_username,
                user_password,
              });
            }}
            variant="contained"
            className="bg-[#01B14F] md:min-w-[200px] max-w-[400px] focus:bg-[#01B14F] hover:bg-[#01B14F]"
          >
            ยืนยัน
          </Button>
          <div>
            <div className="mb-[20px]">
              คุณมีบัญชีอยู่แล้วใช่ไหม?{" "}
              <Link
                to={"/login"}
                className="text-[#009c49] font-bold cursor-pointer"
              >
                เข้าสู่ระบบ
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
