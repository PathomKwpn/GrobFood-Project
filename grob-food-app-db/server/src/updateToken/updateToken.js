const pool = require("../../database/pool");
const common = require("../common/commonService");

const exec = async (req, res) => {
  let client = await pool.connect();
  let responseData = {};

  try {
    let data = req.body;
    let param = [data.username];
    let tokenObj = data.username;
    responseData._token = await common.commonService.generateToken(tokenObj);
    console.log(responseData._token, "sdsd");
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
