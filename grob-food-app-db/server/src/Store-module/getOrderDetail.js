const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let store = await pool.connect();
  await store.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;
    let param_billID = [data.bill_id];
    let sql_getOrderDetail = `select * from bills where bill_id = $1;`;
    let response_getOrderDetail = await pool.query(
      sql_getOrderDetail,
      param_billID
    );

    let sql_getRestaurantAddress = `select restaurant_name,latitude,longitude from restaurants  where restaurant_id = $1 `;
    let param2 = [response_getOrderDetail.rows[0].restaurant_id];
    let response_getRes = await pool.query(sql_getRestaurantAddress, param2);

    response_getOrderDetail.rows[0].restaurant_name =
      response_getRes.rows[0].restaurant_name;
    response_getOrderDetail.rows[0].restaurant_latitude =
      response_getRes.rows[0].latitude;
    response_getOrderDetail.rows[0].restaurant_longitude =
      response_getRes.rows[0].longitude;
    let sql_getCart = `select price,amount,menu_name from cart  where bill_id = $1;`;
    let response_getCart = await pool.query(sql_getCart, param_billID);

    response_getOrderDetail.rows[0].menulist = response_getCart.rows;

    let param4 = [response_getOrderDetail.rows[0].user_id];
    let sql_getUserPhone = `select user_phone from public."user" where user_id = $1`;
    let response_getUserPhone = await pool.query(sql_getUserPhone, param4);

    response_getOrderDetail.rows[0].userPhone =
      response_getUserPhone.rows[0].user_phone;
    console.log(response_getOrderDetail.rows, "RES");
    responseData.success = true;
    responseData.data = response_getOrderDetail.rows;
    // console.log(response);
    // console.log(responseData.data);
    store.query("COMMIT");
  } catch (error) {
    store.query("ROLLBACK");
    responseData.success = false;
    responseData.data = "something error try again!";
    console.log(error);
  } finally {
    store.release();
  }

  res.status(200).send(responseData);
  return res.end();
};
module.exports = exec;
