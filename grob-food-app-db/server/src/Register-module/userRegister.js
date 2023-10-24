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
    let sqlUser = `SELECT * FROM public.user WHERE user_username = $1`;
    // console.log(sqlUser, "user_username");
    let paramUser = [data.user_username];
    // console.log(paramUser, "This is paramUser");
    let responseUser = await pool.query(sqlUser, paramUser);
    // console.log(responseUser);

    if (responseUser.rowCount > 0) {
      responseData.success = false;
      responseData.data = "User duplicate";
    } else {
      let user_uuid = uuid();
      let encrypted = await common.commonService.encrypted(data.user_password);
      let sql = `INSERT INTO public."user"
(user_id, user_firstname, user_lastname, user_age, user_phone, user_username, user_password, regis_date,update_date,update_by)
VALUES($1, $2, $3, $4, $5, $6, $7, now(),now(),$1);`;
      let param = [
        user_uuid,
        data.user_firstname,
        data.user_lastname,
        data.user_age,
        data.user_phone,
        data.user_username,
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
