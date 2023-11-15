import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "typeface-cormorant";
import { createTheme, ThemeProvider, Typography } from "@mui/material";
//pages-IMPORT
import Home from "./page/Home/Home";
import HomeAuth from "./page/Home/Home-auth";
import OwnerHome from "./page/Owner-Home/Owner-Home";
import RegisterPage from "./page/Register-pages/Register";
import LoginPage from "./page/Login-pages/Login";
import OwnerStoreDetail from "./page/Owner-StoreDetail/OwnerStoreDetail";
import UserProfile from "./page/UserProfile/UserProfile";
import StoreListHome from "./page/StoreList-page/StoreList-Home";
import StorePage from "./page/StoreDetailPage/StorePage";
import ConfirmPage from "./page/ConfirmPage/ConfirmPage";
import { useToken } from "./util/token/token";
import Box from "@mui/material/Box";
const theme = createTheme({
  typography: {
    fontFamily: ["Kanit", "sans-serif"].join(","),
  },
});
function App() {
  // const [tokenStatus, setTokenStatus] = useState(false);
  const {
    token,
    clearToken,
    user,
    saveTokentoLocalStorage,
    saveUsertoLacalStorage,
    createCarttoLocalStorage,
  } = useToken();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          clearToken={clearToken}
          token={token}
          user={user}
          // tokenstatus={tokenStatus}
        />
      ),
    },
    {
      path: "/home",
      element: (
        <HomeAuth
          clearToken={clearToken}
          token={token}
          user={user}
          // tokenstatus={tokenStatus}
        />
      ),
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/userprofile",
      element: (
        <UserProfile clearToken={clearToken} token={token} user={user} />
      ),
    },
    {
      path: "/ownerhome",
      element: <OwnerHome clearToken={clearToken} token={token} user={user} />,
    },
    {
      path: "/ownerstore-detail",
      element: (
        <OwnerStoreDetail clearToken={clearToken} token={token} user={user} />
      ),
    },
    {
      path: "/allstore",
      element: <StoreListHome clearToken={clearToken} />,
    },
    {
      path: "/allstore/:resid",
      element: (
        <StorePage
          clearToken={clearToken}
          createCart={createCarttoLocalStorage}
        />
      ),
    },
    {
      path: "/confirmpage",
      element: <ConfirmPage />,
    },
  ]);
  // if (!token) {
  //   console.log("not have token");
  //   return setTokenStatus(false);
  // } else {
  //   console.log("have token");
  //   return setTokenStatus(true);
  // }
  // if (!token) {
  //   console.log("token", token);

  //   return (
  //     <Home
  //       clearToken={clearToken}
  //       token={token}
  //       user={user}
  //       // tokenstatus={tokenStatus}
  //     />
  //   );
  // }
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography component="span">
          <RouterProvider router={router} />
        </Typography>
      </div>
    </ThemeProvider>
  );
}

export default App;
