const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let store = await pool.connect();
  await store.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;
    let param = [data.bill_id, data.newBillStatus];
    console.log(param);
    let sql = `select * from bills  where bill_status = 'Find Driver';`;
    let sql_updateBill = `UPDATE public.bills
SET bill_status=$2
WHERE bill_id=$1;`;
    let response = await pool.query(sql_updateBill, param);
    // console.log(response);
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
