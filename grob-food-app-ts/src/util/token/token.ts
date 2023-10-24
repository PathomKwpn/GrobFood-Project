import { useState } from "react";
import jwt_decode from "jwt-decode";
function useToken() {
  const saveTokentoLocalStorage = (tokenData) => {
    window.localStorage.setItem("token", JSON.stringify(tokenData));
    setToken(tokenData);
  };

  const saveUsertoLacalStorage = (userData) => {
    window.localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  const getToken = () => {
    let tokenString: string | null = window.localStorage.getItem("token");
    let userString: string | null = window.localStorage.getItem("user");
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
    saveTokentoLocalStorage,
    saveUsertoLacalStorage,
    clearToken,
  };
}

export { useToken };
