const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8081;
const cors = require("cors");

const userRegister = require("./src/Register-module/userRegister");
const ownerRegister = require("./src/Register-module/ownerRegister");
const driverRegister = require("./src/Register-module/driverRegister");
const userLogin = require("./src/Login-module/userLogin");
const ownerLogin = require("./src/Login-module/ownerLogin");
const driverLogin = require("./src/Login-module/driverLogin");
const getOwnerStore = require("./src/Store-module/getOwnerStore");
const addStore = require("./src/Store-module/addStore");
const updateStore = require("./src/Store-module/updateStore");
const addStoreTopic = require("./src/Store-module/addStoreTopic");
const getStoreTopic = require("./src/Store-module/getStoreTopic");
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

//OWNER_STOREADDTOPIC
app.post("/addtopic", async (req, res) => {
  addStoreTopic(req, res);
});

//GET TOPIC
app.post("/getstoretopic", async (req, res) => {
  getStoreTopic(req, res);
});
