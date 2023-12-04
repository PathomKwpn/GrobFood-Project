const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let store = await pool.connect();
  await store.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;

    let param = [data.driver_id];
    let sql = `select * from bills  where driver_id = $1;`;
    let response = await pool.query(sql, param);
    console.log(response.rows[0].restaurant_id);

    let sql_getRestaurantAddress = `select restaurant_name,latitude,longitude from restaurants  where restaurant_id = $1;`;
    let param2 = [response.rows[0].restaurant_id];
    let response_getRes = await pool.query(sql_getRestaurantAddress, param2);
    console.log(response_getRes.rows[0]);
    response.rows[0].restaurant_name = response_getRes.rows[0].restaurant_name;
    response.rows[0].restaurant_latitude = response_getRes.rows[0].latitude;
    response.rows[0].restaurant_longitude = response_getRes.rows[0].longitude;
    let param3 = [response.rows[0].bill_id];
    let sql_getCart = `select price,amount,menu_name from cart  where bill_id = $1;`;
    let response_getCart = await pool.query(sql_getCart, param3);
    console.log(response_getCart.rows);
    response.rows[0].menulist = response_getCart.rows;
    responseData.success = true;
    responseData.data = response.rows;
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
