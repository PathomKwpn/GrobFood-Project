import React from "react";
import { NavbarAdmin } from "./component/index";
import LoginAdmin from "./LoginAdmin";
import { useToken } from "../../util/token/token";
import { Button } from "@mui/material";
const AdminPage = () => {
  const {
    saveTokentoLocalStorage,
    saveUsertoLacalStorage,
    createCarttoLocalStorage,
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

  return (
    <div className=" bg-slate-100 w-full min-h-[100vh]">
      <NavbarAdmin />
      <div className="flex flex-row justify-around my-[24px]">
        <Button
          variant="contained"
          onClick={() => {}}
          className="bg-[#01B14F] min-w-[150px] md:min-w-[200px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F]"
        >
          รายการร้านค้า
        </Button>
        <Button
          variant="contained"
          onClick={() => {}}
          className="bg-[#01B14F] min-w-[150px] md:min-w-[200px] max-w-[400px] focus:bg-[#01b14f] hover:bg-[#01B14F]"
        >
          รายการคูปองส่วนลด
        </Button>
      </div>
      <div className="bg-black w-[full] h-[800px] flex justify-center">
        <div className="bg-white w-[600px] h-[800px] ะำปะขบ">รายการร้านค้า</div>
      </div>
    </div>
  );
};

export default AdminPage;
