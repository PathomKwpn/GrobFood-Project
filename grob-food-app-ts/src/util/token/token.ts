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
  const createCarttoLocalStorage = (cart: object) => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  };
  const getToken = () => {
    let tokenString: any = window.localStorage.getItem("token");
    let userString: any = window.localStorage.getItem("user");
    let cartString: any = window.localStorage.getItem("cart");
    let userToken = JSON.parse(tokenString);
    let userData = JSON.parse(userString);
    let userCart = JSON.parse(cartString);
    if (userToken) {
      let decode = jwt_decode(userToken);
      let currentTiem = Math.floor(new Date().getTime() / 1000);

      if (decode.exp - currentTiem <= 0) {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("cart");
        return { userToken: "", userData: "", userCart: "" };
      }
      return { userToken, userData, userCart };
    } else {
      return { userToken: "", userData: "", userCart: "" };
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
    window.localStorage.removeItem("cart");
    setToken("");
    setUser("");
    setCart("");
  };

  const [token, setToken] = useState(getToken().userToken);
  const [user, setUser] = useState(getToken().userData);
  const [cart, setCart] = useState(getToken().userCart);
  return {
    token,
    user,
    cart,
    updateToken,
    saveTokentoLocalStorage,
    createCarttoLocalStorage,
    saveUsertoLacalStorage,
    clearToken,
  };
}

export { useToken };
