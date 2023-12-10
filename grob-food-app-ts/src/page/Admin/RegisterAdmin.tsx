import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { AlertTitle } from "@mui/material";
import Alert from "@mui/material/Alert";
import FilledInput from "@mui/material/FilledInput";
import { Link } from "react-router-dom";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
const RegisterAdmin = () => {
  const [admin_firstname, setAdmin_FirstName] = useState<string>("");
  const [admin_lastname, setAdmin_LastName] = useState<string>("");
  const [admin_username, setAdmin_Username] = useState<string>("");
  const [admin_password, setAdmin_Password] = useState<string>("");

  const DEFAULT_ALERT = {
    title: "",
    data: "",
    type: "info",
  };
  const [alertStatus, setAlertStatus] = useState(DEFAULT_ALERT);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const haddleSubmit = (event: any) => {
    event.preventDefault();
  };

  const submitRegister = async (data: any) => {
    const response = await axios.post(
      `${GROBFOOD_USER_URL}/admin-register`,
      data
    );
    console.log(response.data);
    if (
      admin_username == "" ||
      admin_firstname == "" ||
      admin_lastname == "" ||
      admin_password == ""
    ) {
      setAlertStatus({
        title: "FAIL",
        data: "กรุณาใส่ข้อมูลให้ครบถ้วน",
        type: "warning",
      });
    } else if (response.data.success) {
      console.log(response.data.success, "hello");
      setAdmin_FirstName("");
      setAdmin_LastName("");
      setAdmin_Username("");
      setAdmin_Password("");
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
    <div className="bg-[green] w-[100%] h-[100vh] flex justify-center items-center">
      <div className="absolute top-[40px] md:top-[80px] left-[50%] translate-x-[-50%] w-[350px]">
        {alertStatus.data && (
          <Alert severity={alertStatus.type} className="mb-[40px] ">
            <AlertTitle>{alertStatus.title}</AlertTitle>
            {alertStatus.data} — <strong>check it out!</strong>
          </Alert>
        )}
      </div>
      <div className="flex flex-col items-center w-[100%] sm:max-w-[ุ400px] md:w-[500px] h-[auto] max-h-[800px] bg-[#FFFFFF] rounded-xl px-[1%] shadow-md ">
        <div className="w-full h-[auto] flex justify-center mt-[40px]">
          <div className="text-[32px] font-bold flex flex-col justify-center text-center md:flex-row gap-2">
            <span className="text-[#009C49]">ADMIN</span> <span>REGISTER</span>
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
              value={admin_firstname}
              size="small"
              onChange={(v) => {
                setAdmin_FirstName(v.target.value);
              }}
            />
            <TextField
              label="Lastname"
              variant="filled"
              color="success"
              focused
              size="small"
              value={admin_lastname}
              onChange={(v) => {
                setAdmin_LastName(v.target.value);
              }}
            />

            <TextField
              label="Username"
              variant="filled"
              color="success"
              focused
              size="small"
              value={admin_username}
              onChange={(v) => {
                setAdmin_Username(v.target.value);
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
                value={admin_password}
                onChange={(v) => {
                  setAdmin_Password(v.target.value);
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
              submitRegister({
                admin_firstname,
                admin_lastname,
                admin_username,
                admin_password,
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
                to={"/loginadmin"}
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

export default RegisterAdmin;
