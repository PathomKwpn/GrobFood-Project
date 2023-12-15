import { Navbarauth } from "../Home/components";
import { StoreList_catagory } from "./components/index";
import Login from "../Login-pages/Login";
import Footer from "../Footer/Footer";
import axios from "axios";
import { GROBFOOD_USER_URL } from "../../util/constants/constant";
import { useEffect, useState } from "react";

interface allstoreListProps {
  close_time: string;
  latitude: string;
  longitude: string;
  open_time: string;
  restaurant_catagory: string;
  restaurant_id: string;
  restaurant_name: string;
  restaurants_image_url: string;
  score: string;
}

const StoreListCoffeOrTea = () => {
  const getOwner = localStorage.getItem("user");
  if (!getOwner) {
    return <Login />;
  }

  const [allstoreList, setAllStoreList] = useState<Array<allstoreListProps>>();
  const [filteredUsers, setFilteredUsers] = useState(allstoreList);
  const getCoffeeOrTeaStore = async () => {
    console.log();
    const response = await axios.get(`${GROBFOOD_USER_URL}/getcoffeorteastore`);
    if (response.data.success) {
      setAllStoreList(response.data.data);

      setFilteredUsers(response.data.data);
    } else {
      console.log("err");
    }
  };
  useEffect(() => {
    getCoffeeOrTeaStore();
  }, []);

  return (
    <div className="bg-[#eeeeee]">
      <Navbarauth />
      {allstoreList != undefined && filteredUsers != undefined && (
        <StoreList_catagory
          allstoreList={allstoreList}
          filteredUsers={filteredUsers}
          setFilteredUsers={setFilteredUsers}
        />
      )}
      <Footer />
    </div>
  );
};

export default StoreListCoffeOrTea;
