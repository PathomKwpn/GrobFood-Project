const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let store = await pool.connect();
  await store.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;
    let paramCheck = [data.driver_id];
    let param = [data.driver_id, data.bill_id];
    console.log(param);
    let sql = `select * from bills  where driver_id = $1 and bill_status != 'order success';`;
    let responseCheck = await pool.query(sql, paramCheck);
    if (responseCheck.rows[0] != undefined) {
      console.log(responseCheck.rows[0], "SS");
      responseData.success = false;
      responseData.data = "คุณมีงานที่รับอยู้แล้ว";
    } else if (responseCheck.rowCount != 1) {
      let sql_updateBill = `UPDATE public.bills
      SET bill_status='Find Driver Success',driver_id=$1
      WHERE bill_id=$2;`;
      let response = await pool.query(sql_updateBill, param);
      // console.log(response);
      responseData.success = true;
      responseData.data = response.rows;
    }

    // console.log(responseData.data);
    store.query("COMMIT");
  } catch (error) {
    store.query("ROLLBACK");
    responseData.success = false;
    responseData.data = "คุณมีงานที่ยังทำไม่เสร็จ";
    console.log(error);
  } finally {
    store.release();
  }

  res.status(200).send(responseData);
  return res.end();
};
module.exports = exec;
