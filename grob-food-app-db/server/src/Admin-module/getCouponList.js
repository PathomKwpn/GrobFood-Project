const pool = require("../../database/pool");

const exec = async (req, res) => {
  let admin = await pool.connect();
  await admin.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;
    let sql = `SELECT * FROM public.coupon;`;
    let response = await pool.query(sql);
    responseData.success = true;
    responseData.data = response.rows;
    admin.query("COMMIT");
  } catch (error) {
    admin.query("ROLLBACK");
    responseData.success = false;
    responseData.data = "getCouponList Fail";
    console.log(error);
  } finally {
    admin.release();
  }

  res.status(200).send(responseData);
  return res.end();
};
module.exports = exec;
