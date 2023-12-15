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

    let sql = `select driver_id,driver_firstname,driver_lastname,driver_phone,driver_credit,update_date from driver where driver_id = $1 ;`;
    let response = await pool.query(sql, param);
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
