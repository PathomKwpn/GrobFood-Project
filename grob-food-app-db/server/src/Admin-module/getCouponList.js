const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let admin = await pool.connect();
  await admin.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;
    console.log(data);

    let sql = `SELECT *
FROM public.coupon;`;
    let response = await pool.query(sql);
    console.log(response);
    responseData.success = true;
    responseData.data = response.rows;
    console.log(responseData.data);
    admin.query("COMMIT");
  } catch (error) {
    admin.query("ROLLBACK");
    responseData.success = false;
    responseData.data = "something error try again!";
    console.log(error);
  } finally {
    admin.release();
  }

  res.status(200).send(responseData);
  return res.end();
};
module.exports = exec;
