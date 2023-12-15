const pool = require("../../database/pool");
const common = require("../common/commonService");

const exec = async (req, res) => {
  let store = await pool.connect();
  await store.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;
    let newStatus;
    if (data.status == "Allow") {
      newStatus = "Not allowed";
    } else {
      newStatus = "Allow";
    }
    let sql = `UPDATE public.restaurants
SET  status=$1
WHERE restaurant_id=$2;`;
    let param = [newStatus, data.restaurant_id];
    let response = await pool.query(sql, param);
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
