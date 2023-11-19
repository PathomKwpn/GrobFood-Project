const pool = require("../../database/pool");
const common = require("../common/commonService");

const exec = async (req, res) => {
  let client = await pool.connect();
  let responseData = {};

  try {
    let data = req.body;
    let sql = `SELECT * FROM public.admin WHERE admin_username = $1`;
    let param = [data.admin_username];
    console.log(param);
    let responseUser = await pool.query(sql, param);
    if (responseUser.rowCount < 1) {
      responseData.success = false;
      responseData.data = "user not found";
    } else if (!responseUser.rowCount < 1) {
      let decryptedPwd = await common.commonService.decrypted(
        //เรียกใช้งานการ decrypted จาก common
        responseUser.rows[0].admin_password
      );
      if (decryptedPwd == data.admin_password) {
        //เช็ค password ที่เข้ามาว่าตรงกับ password ใน database ไหม
        let tokenObj = responseUser.rows[0].admin_id;
        console.log(tokenObj, "token");
        responseData.success = true;
        responseData.data = responseUser.rows.map((i) => ({
          id: i.admin_id,
          firstname: i.admin_firstname,
          lastname: i.admin_lastname,
          username: i.admin_username,
        }));
        responseData._token = await common.commonService.generateToken(
          tokenObj
        );
        console.log(responseData._token, "sdsd");
      } else {
        console.log(decryptedPwd, "  ", data.password);
        responseData.success = false;
        responseData.data = "password invalid";
      }
    }
  } catch (error) {
    console.log(error);
    responseData.success = false;
  } finally {
    client.release();
  }

  res.status(200).send(responseData);
  return res.end();
};

module.exports = exec;
