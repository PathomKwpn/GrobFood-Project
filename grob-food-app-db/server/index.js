const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8081;
const cors = require("cors");

const userRegister = require("./src/Register-module/userRegister");
const ownerRegister = require("./src/Register-module/ownerRegister");
const driverRegister = require("./src/Register-module/driverRegister");
const adminRegister = require("./src/Register-module/adminRegister");
const userLogin = require("./src/Login-module/userLogin");
const ownerLogin = require("./src/Login-module/ownerLogin");
const driverLogin = require("./src/Login-module/driverLogin");
const adminLogin = require("./src/Login-module/adminLogin");
const getOwnerStore = require("./src/Store-module/getOwnerStore");
const addStore = require("./src/Store-module/addStore");
const addCoupon = require("./src/Admin-module/addCoupon");
const updateStore = require("./src/Store-module/updateStore");
const updateUser = require("./src/User-module/updateUserInfo");
const addStoreTopic = require("./src/Store-module/addStoreTopic");
const getStoreTopic = require("./src/Store-module/getStoreTopic");
const addMenu = require("./src/Store-module/addMenu");
const getMenu = require("./src/Store-module/getMenu");
const deleteMenu = require("./src/Store-module/deleteMenu");
const deleteTopic = require("./src/Store-module/deleteTopic");
const deleteStore = require("./src/Store-module/deleteStore");
const updateToken = require("./src/updateToken/updateToken");
const getUserDetail = require("./src/User-module/getUserDetail");
const getAllStoreList = require("./src/Front-store-module/getAllStoreList");
const getStoreDetail = require("./src/Front-store-module/getStoreDetail");
const getStoreAddres = require("./src/Front-store-module/getStoreAddress");
const getStoreList = require("./src/Admin-module/getStoreList");
const getCouponList = require("./src/Admin-module/getCouponList");
const addBill = require("./src/Cart&bill-module/addBill");
const addCart = require("./src/Cart&bill-module/addCart");
const updateStatusStore = require("./src/Admin-module/updateStatusStore");
const getBill = require("./src/Cart&bill-module/getBill");
const getCartList = require("./src/Cart&bill-module/getCart");
const getOrderFindDriver = require("./src/Driver-module/getOrderFindDriver");
const driverAcceptWork = require("./src/Driver-module/driverAcceptWork");
const driverWorkList = require("./src/Driver-module/getDriverWorkList");
const updateBillStatus = require("./src/Driver-module/updateBillStatus");
app.use(bodyParser.json({ limit: "100mb" }));
app.use(cors());
app.listen(PORT, () => console.log(`server is running on ${PORT}`));

app.get("/test", async (req, res) => {
  res.json("test-grob-food");
});

//USER_REGISTER
app.post("/register", async (req, res) => {
  userRegister(req, res);
});

//OWNER_REGISTER
app.post("/owner-register", async (req, res) => {
  ownerRegister(req, res);
});

//DRIVER REGISTER
app.post("/driver-register", async (req, res) => {
  driverRegister(req, res);
});

//ADMIN REGISTER
app.post("/admin-register", async (req, res) => {
  adminRegister(req, res);
});

//USER_LOGIN
app.post("/userlogin", async (req, res) => {
  userLogin(req, res);
});

//OWNER_LOGIN
app.post("/ownerlogin", async (req, res) => {
  ownerLogin(req, res);
});

//DRIVER_LOGIN
app.post("/driverlogin", async (req, res) => {
  driverLogin(req, res);
});

//ADMIN_LOGIN
app.post("/adminlogin", async (req, res) => {
  adminLogin(req, res);
});

//OWNER_GETSTORE
app.post("/getownerstore", async (req, res) => {
  getOwnerStore(req, res);
});

//OWNER_ADDSTORE
app.post("/addstore", async (req, res) => {
  addStore(req, res);
});

//OWNER_UPDATESTORE
app.post("/updatestore", async (req, res) => {
  updateStore(req, res);
});
app.post("/updateuser", async (req, res) => {
  updateUser(req, res);
});
//OWNER_STOREADDTOPIC
app.post("/addtopic", async (req, res) => {
  addStoreTopic(req, res);
});

//GET TOPIC
app.post("/getstoretopic", async (req, res) => {
  getStoreTopic(req, res);
});

//OWNER_ADDMENU
app.post("/addmenu", async (req, res) => {
  addMenu(req, res);
});
//GET_MENU
app.post("/getmenu", async (req, res) => {
  getMenu(req, res);
});
//DELETE_MENU
app.post("/deletemenu", async (req, res) => {
  deleteMenu(req, res);
});
//DELETE_TOPIC
app.post("/deletetopic", async (req, res) => {
  deleteTopic(req, res);
});
///DELETE STORE
app.post("/deletestore", async (req, res) => {
  deleteStore(req, res);
});
//UPDATE TOKEN
app.get("/updatetoken", async (req, res) => {
  updateToken(req, res);
});
//GETUSER DETAIL
app.post("/getuserdetail", async (req, res) => {
  getUserDetail(req, res);
});
//GET ALLSTORE
app.post("/getallstorelist", async (req, res) => {
  getAllStoreList(req, res);
});
//GET STORE DETAIL
app.post("/getstoredetail", async (req, res) => {
  getStoreDetail(req, res);
});
//GET STORE ADDRESS
app.post("/getstoreaddress", async (req, res) => {
  getStoreAddres(req, res);
});
//GET STORE LIST
app.get("/getstorelist", async (req, res) => {
  getStoreList(req, res);
});
//ADD_NEW_COUPON
app.post("/addnewcoupon", async (req, res) => {
  addCoupon(req, res);
});
//GET_COUPON
app.get("/getcouponlist", async (req, res) => {
  getCouponList(req, res);
});

app.post("/addbill", async (req, res) => {
  addBill(req, res);
});
app.post("/addcart", async (req, res) => {
  addCart(req, res);
});

//UPDATE STATUS STORE
app.post("/updatestatusstore", async (req, res) => {
  updateStatusStore(req, res);
});

//GET USER BILL
app.post("/getuserbill", async (req, res) => {
  getBill(req, res);
});
//GET BILL MENULIST
app.post("/getbillmenulist", async (req, res) => {
  getCartList(req, res);
});

//GET USERORDERLISTs
app.get("/getorderfinddriver", async (req, res) => {
  getOrderFindDriver(req, res);
});

//DRIVER ACCEPT WORK
app.post("/driveracceptwork", async (req, res) => {
  driverAcceptWork(req, res);
});

//DRIVER WORK LIST
app.post("/getdriverworklist", async (req, res) => {
  driverWorkList(req, res);
});

app.post("/updatebillstatus", async (req, res) => {
  updateBillStatus(req, res);
});
