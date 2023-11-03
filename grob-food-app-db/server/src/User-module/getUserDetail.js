const pool = require("../../database/pool");
const common = require("../common/commonService");

const exec = async (req, res) => {
  let owner = await pool.connect();
  console.log(req.body);
  let data = req.body;
  let user_id = data.user_id;
  let responseData = {};
  try {
    let sql = `select * from public."user" u 
where user_id = '${user_id}';`;
    let response = await pool.query(sql);
    if (response.rows.length) {
      responseData.success = true;
      responseData.data = response.rows;
    } else {
      responseData.success = false;
    }
  } catch (error) {
    console.log(error);
    responseData.success = false;
    console.log("ไม่พบผู้ใช้นี้");
  } finally {
    owner.release();
  }
  //   responseData._token = await common.commonService.generateToken(tokenObj);
  res.status(200).send(responseData);
  return res.end();
};

module.exports = exec;
