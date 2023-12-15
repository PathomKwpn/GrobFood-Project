const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let store = await pool.connect();
  await store.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;
    let param = [data.user_id];
    console.log(param);
    let sql = `select * from bills b where user_id =$1 and (bill_status != 'order success' or vote_status = 'none');`;
    let response = await pool.query(sql, param);
    // console.log(response);
    responseData.success = true;
    responseData.data = response.rows;

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
