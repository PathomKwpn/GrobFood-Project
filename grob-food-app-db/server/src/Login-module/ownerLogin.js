const pool = require("../../database/pool");
const common = require("../common/commonService");

const exec = async (req, res) => {
  let client = await pool.connect();
  let responseData = {};

  try {
    let data = req.body;
    let sql = `SELECT * FROM public.owner WHERE owner_username = $1`;
    let param = [data.owner_username];
    let responseOwner = await pool.query(sql, param);
    if (responseOwner.rowCount < 1) {
      responseData.success = false;
      responseData.data = "owner not found";
    } else if (!responseOwner.rowCount < 1) {
      let decryptedPwd = await common.commonService.decrypted(
        //เรียกใช้งานการ decrypted จาก common
        responseOwner.rows[0].owner_password
      );
      if (decryptedPwd == data.owner_password) {
        //เช็ค password ที่เข้ามาว่าตรงกับ password ใน database ไหม
        let tokenObj = responseOwner.rows[0].owner_id;
        console.log(tokenObj, "token");
        responseData.success = true;
        responseData.data = responseOwner.rows.map((i) => ({
          id: i.owner_id,
          firstname: i.owner_firstname,
          lastname: i.owner_lastname,
          username: i.owner_username,
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
