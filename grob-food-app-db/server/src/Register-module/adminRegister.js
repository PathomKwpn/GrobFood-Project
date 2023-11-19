const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let client = await pool.connect();
  await client.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;
    console.log(data, "This is body req");

    //Chech user duplicate
    let sqlUser = `SELECT * FROM public.admin WHERE admin_username = $1`;
    // console.log(sqlUser, "user_username");
    let paramUser = [data.admin_username];
    // console.log(paramUser, "This is paramUser");
    let responseUser = await pool.query(sqlUser, paramUser);
    // console.log(responseUser);

    if (responseUser.rowCount > 0) {
      responseData.success = false;
      responseData.data = "User duplicate";
    } else {
      let admin_uuid = uuid();
      let encrypted = await common.commonService.encrypted(data.admin_password);
      let sql = `INSERT INTO public."admin"
(admin_id, admin_firstname, admin_lastname, admin_username, admin_password, regis_date)
VALUES($1, $2, $3, $4, $5, now());`;
      let param = [
        admin_uuid,
        data.admin_firstname,
        data.admin_lastname,
        data.admin_username,
        encrypted,
      ];
      let response = await pool.query(sql, param);
      console.log(response);
      responseData.success = true;
      responseData.data = "Register Succesful";
      client.query("COMMIT");
    }
  } catch (error) {
    client.query("ROLLBACK");
    responseData.success = false;
    responseData.data = "something error try again!";
    console.log(error);
  } finally {
    client.release();
  }

  res.status(200).send(responseData);
  return res.end();
};
module.exports = exec;
