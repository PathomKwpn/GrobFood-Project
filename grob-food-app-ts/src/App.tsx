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
import OwnerStoreOrderList from "./page/Owner-Home/OwnerStoreOrderList";
import OwernerStoreOrderDetail from "./page/Owner-Home/OwernerStoreOrderDetail";
import UserProfile from "./page/UserProfile/UserProfile";
import StoreListHome from "./page/StoreList-page/StoreList-Home";
import StoreCoffeeOrTeaList from "./page/StoreList-page/StoreList-CoffeeAndTea";
import StoreChicken from "./page/StoreList-page/StoreList-chicken";
import StoreSeafood from "./page/StoreList-page/StoreList-Seafood";
import StoreNoodle from "./page/StoreList-page/StoreList-Noodle";
import StorePage from "./page/StoreDetailPage/StorePage";
import ConfirmPage from "./page/ConfirmPage/ConfirmPage";
import AdminPage from "./page/Admin/AdminPage";
import RegisterAdmin from "./page/Admin/RegisterAdmin";
import LoginAdmin from "./page/Admin/LoginAdmin";
import DriverHome from "./page/Driver/Driver-Home";
import DriverHistory from "./page/Driver/Driver-History";
import DriverProfile from "./page/Driver/Driver-Profile";
import DeliveryPage from "./page/DeliveryPage/DeliveryPage";

import { useToken } from "./util/token/token";

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
    saveLocationtoLocalStorage,
    createCarttoLocalStorage,
  } = useToken();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          clearToken={clearToken}
          saveLocation={saveLocationtoLocalStorage}
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
          saveLocation={saveLocationtoLocalStorage}
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
      element: <UserProfile />,
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
      path: "/ownerstoreorderlist",
      element: (
        <OwnerStoreOrderList
          clearToken={clearToken}
          token={token}
          user={user}
        />
      ),
    },
    {
      path: "/ownerstoreorderlist/:billID",
      element: <OwernerStoreOrderDetail clearToken={clearToken} />,
    },
    {
      path: "/allstore",
      element: <StoreListHome />,
    },
    {
      path: "/coffee&tea",
      element: <StoreCoffeeOrTeaList />,
    },
    {
      path: "/chicken",
      element: <StoreChicken />,
    },
    {
      path: "/seafood",
      element: <StoreSeafood />,
    },
    {
      path: "/noodle",
      element: <StoreNoodle />,
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
      element: <ConfirmPage saveLocation={saveLocationtoLocalStorage} />,
    },
    {
      path: "/adminpage",
      element: <AdminPage />,
    },
    {
      path: "/registeradmin",
      element: <RegisterAdmin />,
    },
    {
      path: "/loginadmin",
      element: (
        <LoginAdmin
          setUser={saveUsertoLacalStorage}
          setToken={saveTokentoLocalStorage}
          createCart={createCarttoLocalStorage}
        />
      ),
    },
    {
      path: "/driverhome",
      element: <DriverHome />,
    },
    {
      path: "/driverhistory",
      element: <DriverHistory />,
    },
    {
      path: "/deliverypage",
      element: <DeliveryPage />,
    },
    {
      path: "/driverprofile",
      element: <DriverProfile />,
    },
  ]);

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
