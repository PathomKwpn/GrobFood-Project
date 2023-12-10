const pool = require("../../database/pool");
const common = require("../common/commonService");

const exec = async (req, res) => {
  let driver = await pool.connect();
  await driver.query("BEGIN");
  let responseData = {};

  try {
    let data = req.body;
    console.log("data", data);
    let sql = `UPDATE public."driver"
SET driver_firstname=$1, driver_lastname=$2, driver_phone=$3, update_date=now(), update_by=$4
WHERE driver_id=$4;`;
    let param = [
      data.driver_firstName,
      data.driver_lastName,
      data.driver_phone,
      data.driver_id,
    ];
    let response = await pool.query(sql, param);
    console.log(response);
    responseData.success = true;
    responseData.data = "Update Succesful";
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
