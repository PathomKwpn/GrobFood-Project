import { useState } from "react";
import { LoginDriver, LoginOwner, LoginUser } from "./components/index";
import { Link } from "react-router-dom";
import { useToken } from "../../util/token/token";

const Login = () => {
  const {
    saveUsertoLacalStorage,
    saveTokentoLocalStorage,
    createCarttoLocalStorage,
  } = useToken();
  const [state, setState] = useState("user");
  const [contrastUser, setContrastUser] = useState(
    "contrast-100 text-[#009C49]"
  );
  const [contrastPartner, setContrastPartner] = useState(
    "contrast-50 text-[#676767]"
  );
  const [contrastDriver, setContrastDriver] = useState(
    "contrast-50 text-[#676767]"
  );
  return (
    <div className="w-full h-[auto]">
      <div className="flex justify-start h-[48px] md:h-[88px] w-full bg-white items-center px-[20px] sticky">
        <div className="w-[90px] h-[auto] md:w-[140px] p-1">
          <Link to={"/"}>
            <img src="./image/logo-grabfood/logo-GrobFood.png" alt="" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-[100%] p-[10px]  h-[100vh] bg-[#01B14F]">
        <div className="flex flex-row w-[100%] justify-center md:gap-2">
          <div
            className={
              "flex justify-center font-bold w-[90px] md:w-[120px] h-[30px] bg-white  border-b-0 rounded-t-xl cursor-pointer " +
              contrastUser
            }
            onClick={() => {
              setState("user");
              setContrastUser("contrast-100 text-[#009C49]");
              setContrastPartner("contrast-50 text-[#676767]");
              setContrastDriver("contrast-50 text-[#676767]");
            }}
          >
            CUSTOMER
          </div>
          <div
            id="partner"
            className={
              "flex justify-center font-bold text-[#676767] w-[90px] md:w-[120px] h-[30px] bg-white  border-b-0 rounded-t-xl cursor-pointer " +
              contrastPartner
            }
            onClick={() => {
              setState("partner");
              setContrastUser("contrast-50 text-[#676767]");
              setContrastPartner("contrast-100 text-[#009C49]");
              setContrastDriver("contrast-50 text-[#676767]");
            }}
          >
            PARTNER
          </div>
          <div
            className={
              "flex justify-center font-bold text-[#676767] w-[90px] md:w-[120px] h-[30px] bg-white  border-b-0 rounded-t-xl cursor-pointer " +
              contrastDriver
            }
            onClick={() => {
              setState("driver");
              setContrastUser("contrast-50 text-[#676767]");
              setContrastPartner("contrast-50 text-[#676767]");
              setContrastDriver("contrast-100 text-[#009C49]");
            }}
          >
            DRIVER
          </div>
        </div>
        {state === "user" && (
          <LoginUser
            setUser={saveUsertoLacalStorage}
            setToken={saveTokentoLocalStorage}
            createCart={createCarttoLocalStorage}
          />
        )}
        {state === "partner" && (
          <LoginOwner
            setUser={saveUsertoLacalStorage}
            setToken={saveTokentoLocalStorage}
          />
        )}
        {state === "driver" && (
          <LoginDriver
            setUser={saveUsertoLacalStorage}
            setToken={saveTokentoLocalStorage}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
