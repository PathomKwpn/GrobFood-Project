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
  const saveLocationtoLocalStorage = (location: object) => {
    window.localStorage.setItem("location", JSON.stringify(location));
    setLocation(location);
  };
  const getToken = () => {
    let tokenString: any = window.localStorage.getItem("token");
    let userString: any = window.localStorage.getItem("user");
    let cartString: any = window.localStorage.getItem("cart");
    let locationString: any = window.localStorage.getItem("location");
    let userToken = JSON.parse(tokenString);
    let userData = JSON.parse(userString);
    let userCart = JSON.parse(cartString);
    let userLocation = JSON.parse(locationString);
    if (userToken) {
      let decode: any = jwt_decode(userToken);
      let currentTiem = Math.floor(new Date().getTime() / 1000);

      if (decode.exp - currentTiem <= 0) {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("cart");
        window.localStorage.removeItem("location");
        return { userToken: "", userData: "", userCart: "", userLocation: "" };
      }
      return { userToken, userData, userCart, userLocation };
    } else {
      return { userToken: "", userData: "", userCart: "", userLocation: "" };
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
    window.localStorage.removeItem("location");
    setToken("");
    setUser("");
    setCart("");
    setLocation("");
  };
  const clearCart = () => {
    createCarttoLocalStorage([]);
  };

  const [token, setToken] = useState(getToken().userToken);
  const [user, setUser] = useState(getToken().userData);
  const [cart, setCart] = useState(getToken().userCart);
  const [location, setLocation] = useState(getToken().userCart);
  return {
    token,
    user,
    cart,
    location,
    updateToken,
    clearCart,
    saveTokentoLocalStorage,
    createCarttoLocalStorage,
    saveUsertoLacalStorage,
    saveLocationtoLocalStorage,
    clearToken,
  };
}

export { useToken };
