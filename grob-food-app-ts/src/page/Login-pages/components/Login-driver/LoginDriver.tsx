import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { GROBFOOD_USER_URL } from "../../../../util/constants/constant";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { AlertTitle } from "@mui/material";
import Alert from "@mui/material/Alert";
import FilledInput from "@mui/material/FilledInput";
import { Link, useNavigate } from "react-router-dom";
const LoginDriver = ({ setUser, setToken }: any) => {
  const [driver_username, setDriver_Username] = useState<string>("");
  const [driver_password, setDriver_Password] = useState<string>("");
  const navigate = useNavigate();
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

  const onLogin = async (data: any) => {
    console.log(data);
    const response = await axios.post(`${GROBFOOD_USER_URL}/driverlogin`, data);

    if (response.data.success) {
      setUser(response.data.data[0]);
      setToken(response.data._token);
      setAlertStatus({
        title: "",
        data: "LOGIN SUCCESSFUL",
        type: "success",
      });
      navigate("/driverhome");
    } else {
      setAlertStatus({
        title: "",
        data: response.data.data,
        type: "error",
      });
      console.log();
    }
  };
  return (
    <div className="">
      <div className="absolute top-[80px] left-[50%] translate-x-[-50%]">
        {alertStatus.data && (
          <Alert severity={alertStatus.type} className="mb-[40px]  opacity-${}">
            <AlertTitle>{alertStatus.title}</AlertTitle>
            {alertStatus.data} — <strong>check it out!</strong>
          </Alert>
        )}
      </div>
      <div className="flex flex-col items-center w-[100%] sm:max-w-[ุ400px] md:w-[500px] h-[auto] bg-[#FFFFFF] rounded-xl px-[1%] shadow-md ">
        <div className="w-full h-[auto] flex justify-center mt-[40px]">
          <div className="text-[32px] font-bold flex flex-col justify-center text-center md:flex-row gap-2">
            <span className="text-[#009C49]">DRIVER</span> <span>LOGIN</span>
          </div>
        </div>
        <form
          // onSubmit={haddleSubmit}
          className="w-full p-[20px] flex flex-col justify-center items-center mt-[30px] gap-7"
        >
          <div className="flex flex-col gap-7 md:min-w-[400px]">
            <TextField
              label="Username"
              variant="filled"
              color="success"
              focused
              size="small"
              value={driver_username}
              onChange={(v) => {
                setDriver_Username(v.target.value);
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
                value={driver_password}
                onChange={(v) => {
                  setDriver_Password(v.target.value);
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
          </div>
          <Button
            onClick={() => {
              if (driver_username) {
                onLogin({
                  driver_username,
                  driver_password,
                });
              } else {
                setAlertStatus({
                  title: "กรุณาใส่ username หรือ password",
                  data: "missing",
                  type: "error",
                });
              }
            }}
            variant="contained"
            className="bg-[#01B14F] md:min-w-[200px] max-w-[400px] focus:bg-[red] hover:bg-[#01B14F]"
          >
            เข้าสู่ระบบ
          </Button>
          <div>
            <div className="mb-[20px]">
              คุณยังไม่มีบัญชีใช่หรือไม่?{" "}
              <Link
                to={"/register"}
                className="text-[#009c49] font-bold cursor-pointer"
              >
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginDriver;
