import { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { GROBFOOD_USER_URL } from "../constants/constant";
function useToken() {
  const saveTokentoLocalStorage = (tokenData: object) => {
    window.localStorage.setItem("token", JSON.stringify(tokenData));
    setToken(tokenData);
  };

  const saveUsertoLacalStorage = (userData: object) => {
    window.localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  const getToken = () => {
    let tokenString: any = window.localStorage.getItem("token");
    let userString: any = window.localStorage.getItem("user");
    let userToken = JSON.parse(tokenString);
    let userData = JSON.parse(userString);
    if (userToken) {
      let decode = jwt_decode(userToken);
      let currentTiem = Math.floor(new Date().getTime() / 1000);

      if (decode.exp - currentTiem <= 0) {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        return { userToken: "", userData: "" };
      }
      return { userToken, userData };
    } else {
      return { userToken: "", userData: "" };
    }
  };

  const updateToken = async () => {
    let tokenString: any = window.localStorage.getItem("token");
    let userString: any = window.localStorage.getItem("user");
    let userToken = JSON.parse(tokenString);
    let userData = JSON.parse(userString);
    let userName: any = { username: userData.username };
    if (userToken) {
      const response = await axios.get(
        `${GROBFOOD_USER_URL}/updatetoken`,
        userName
      );
      saveTokentoLocalStorage(response.data._token);
      console.log(response.data._token, "updateToken success");
    }
  };
  const clearToken = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    setToken("");
    setUser("");
  };

  const [token, setToken] = useState(getToken().userToken);
  const [user, setUser] = useState(getToken().userData);
  return {
    token,
    user,
    updateToken,
    saveTokentoLocalStorage,
    saveUsertoLacalStorage,
    clearToken,
  };
}

export { useToken };
