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
    console.log(param, "PARA");
    let sql = `select * from bills  where driver_id = $1 and bill_status = 'order success';`;
    let response = await pool.query(sql, param);

    let sql_getRestaurantAddress = `select restaurant_name,latitude,longitude from restaurants  where restaurant_id = $1 `;
    console.log(response.rows.length);
    for (let i = 0; i < response.rows.length; i++) {
      let param2 = [response.rows[i].restaurant_id];
      let response_getRes = await pool.query(sql_getRestaurantAddress, param2);
      console.log(response_getRes.rows[0]);
      response.rows[i].restaurant_name =
        response_getRes.rows[0].restaurant_name;
      response.rows[i].restaurant_latitude = response_getRes.rows[0].latitude;
      response.rows[i].restaurant_longitude = response_getRes.rows[0].longitude;
    }

    for (let i = 0; i < response.rows.length; i++) {
      let param4 = [response.rows[0].user_id];
      let sql_getUserPhone = `select user_phone from public."user" where user_id = $1`;
      let response_getUserPhone = await pool.query(sql_getUserPhone, param4);

      response.rows[i].userPhone = response_getUserPhone.rows[0].user_phone;
    }
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
