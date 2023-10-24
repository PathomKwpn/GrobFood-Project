const pool = require("../../database/pool");
const common = require("../common/commonService");

const exec = async (req, res) => {
  let client = await pool.connect();
  let responseData = {};

  try {
    let data = req.body;
    let sql = `SELECT * FROM public.driver WHERE driver_username = $1`;
    let param = [data.driver_username];
    let responseDriver = await pool.query(sql, param);
    if (responseDriver.rowCount < 1) {
      responseData.success = false;
      responseData.data = "driver not found";
    } else if (!responseDriver.rowCount < 1) {
      let decryptedPwd = await common.commonService.decrypted(
        //เรียกใช้งานการ decrypted จาก common
        responseDriver.rows[0].driver_password
      );
      if (decryptedPwd == data.driver_password) {
        //เช็ค password ที่เข้ามาว่าตรงกับ password ใน database ไหม
        let tokenObj = responseDriver.rows[0].driver_id;
        console.log(tokenObj, "token");
        responseData.success = true;
        responseData.data = responseDriver.rows.map((i) => ({
          id: i.driver_id,
          firstname: i.driver_firstname,
          lastname: i.driver_lastname,
          username: i.driver_username,
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
