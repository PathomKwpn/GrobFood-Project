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
    let sqlUser = `SELECT * FROM owner WHERE owner_username = $1`;
    // console.log(sqlUser, "user_username");
    let paramUser = [data.owner_username];
    // console.log(paramUser, "This is paramUser");
    let responseUser = await pool.query(sqlUser, paramUser);
    // console.log(responseUser);

    if (responseUser.rowCount > 0) {
      responseData.success = false;
      responseData.data = "User duplicate";
    } else {
      let owner_uuid = uuid();
      let encrypted = await common.commonService.encrypted(data.owner_password);
      let sql = `INSERT INTO public."owner"
(owner_id, owner_firstname, owner_lastname, owner_phone, owner_username, owner_password, regis_date, update_date, update_by)
VALUES($1, $2, $3, $4, $5, $6, now(), now(), $1);`;
      let param = [
        owner_uuid,
        data.owner_firstname,
        data.owner_lastname,
        data.owner_phone,
        data.owner_username,
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
