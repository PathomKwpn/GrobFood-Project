const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let driver = await pool.connect();
  await driver.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;

    let sql = `select * from bills  where bill_status = 'Find Driver';`;
    let response = await pool.query(sql);
    let sql_getRestaurantAddress = `select restaurant_name,latitude,longitude from restaurants  where restaurant_id = $1 `;
    for (let i = 0; i < response.rows.length; i++) {
      let param2 = [response.rows[i].restaurant_id];
      let response_getRes = await pool.query(sql_getRestaurantAddress, param2);
      console.log(response_getRes.rows[0]);
      response.rows[i].restaurant_name =
        response_getRes.rows[0].restaurant_name;
      response.rows[i].restaurant_latitude = response_getRes.rows[0].latitude;
      response.rows[i].restaurant_longitude = response_getRes.rows[0].longitude;
    }
    // console.log(response);
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
