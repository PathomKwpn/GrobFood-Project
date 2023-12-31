const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let driver = await pool.connect();
  await driver.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;

    let param = [data.driver_id];
    let sql = `select * from bills  where driver_id = $1 and bill_status != 'order success';`;
    let response = await pool.query(sql, param);

    let sql_getRestaurantAddress = `select restaurant_name,latitude,longitude from restaurants  where restaurant_id = $1 `;
    let param2 = [response.rows[0].restaurant_id];
    let response_getRes = await pool.query(sql_getRestaurantAddress, param2);

    response.rows[0].restaurant_name = response_getRes.rows[0].restaurant_name;
    response.rows[0].restaurant_latitude = response_getRes.rows[0].latitude;
    response.rows[0].restaurant_longitude = response_getRes.rows[0].longitude;

    let param3 = [response.rows[0].bill_id];
    let sql_getCart = `select price,amount,menu_name from cart  where bill_id = $1;`;
    let response_getCart = await pool.query(sql_getCart, param3);

    response.rows[0].menulist = response_getCart.rows;

    let param4 = [response.rows[0].user_id];
    let sql_getUserPhone = `select user_phone from public."user" where user_id = $1`;
    let response_getUserPhone = await pool.query(sql_getUserPhone, param4);

    response.rows[0].userPhone = response_getUserPhone.rows[0].user_phone;
    responseData.success = true;
    responseData.data = response.rows;
    // console.log(responseData.data);
    driver.query("COMMIT");
  } catch (error) {
    driver.query("ROLLBACK");
    responseData.success = false;
    responseData.data = "something error try again!";
    console.log(error);
  } finally {
    driver.release();
  }

  res.status(200).send(responseData);
  return res.end();
};
module.exports = exec;
