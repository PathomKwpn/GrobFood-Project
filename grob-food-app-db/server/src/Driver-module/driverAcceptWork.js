const pool = require("../../database/pool");
const common = require("../common/commonService");

const exec = async (req, res) => {
  let driver = await pool.connect();
  await driver.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;
    let paramCheck = [data.driver_id];
    let param = [data.driver_id, data.bill_id];
    console.log(param);
    let sql = `select * from bills  where driver_id = $1 and bill_status != 'order success';`;
    let CheckDriverWorkDupilcate = await pool.query(sql, paramCheck);
    if (CheckDriverWorkDupilcate.rows[0] != undefined) {
      responseData.success = false;
      responseData.data = "คุณมีงานที่รับอยู้แล้ว";
    } else if (CheckDriverWorkDupilcate.rowCount != 1) {
      let sql_updateBill = `UPDATE public.bills
      SET bill_status='Find Driver Success',driver_id=$1
      WHERE bill_id=$2;`;
      let response = await pool.query(sql_updateBill, param);
      // console.log(response);
      responseData.success = true;
      responseData.data = response.rows;
    }

    // console.log(responseData.data);
    driver.query("COMMIT");
  } catch (error) {
    driver.query("ROLLBACK");
    responseData.success = false;
    responseData.data = "คุณมีงานที่ยังทำไม่เสร็จ";
    console.log(error);
  } finally {
    driver.release();
  }

  res.status(200).send(responseData);
  return res.end();
};
module.exports = exec;
