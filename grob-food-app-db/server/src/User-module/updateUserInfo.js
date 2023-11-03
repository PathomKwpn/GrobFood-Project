const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let store = await pool.connect();
  await store.query("BEGIN");
  let responseData = {};

  try {
    let data = req.body;
    console.log("data", data);
    let sql = `UPDATE public."user"
SET user_firstname=$1, user_lastname=$2, user_age=$3, user_phone=$4, update_date=now(), update_by=$5
WHERE user_id=$5;`;
    let param = [
      data.user_firstname,
      data.user_lastname,
      data.user_age,
      data.user_phone,
      data.user_id,
    ];
    let response = await pool.query(sql, param);
    console.log(response);
    responseData.success = true;
    responseData.data = "Register Succesful";
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
