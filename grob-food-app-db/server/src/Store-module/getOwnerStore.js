const pool = require("../../database/pool");
const common = require("../common/commonService");

const exec = async (req, res) => {
  let owner = await pool.connect();
  console.log(req.body);
  let data = req.body;
  let owner_id = data.owner_id;
  // console.log(data, "data<<<>>>>>");
  // console.log(`'${owner_id}'`, "owner_id");
  let responseData = {};
  try {
    let sql = `select * from owner o
        join restaurants r on o.owner_id  = r.owner_id
        join restaurants_image i on i.restaurants_id = r.restaurant_id
        where o.owner_id ='${owner_id}';`;
    // let tokenObj = { user_id: req._user.user_id };
    let response = await pool.query(sql);
    // console.log(response);
    if (response.rows.length) {
      // console.log(
      //   "pathfileLocation -->>",
      //   response.rows[0].restaurants_image_url,
      //   "<<<<"
      // );
      const fileImage = common.commonService.pathFileToBaes64(
        response.rows[0].restaurants_image_url
      );
      responseData.success = true;
      responseData.data = response.rows;
      responseData.image = fileImage;
      // console.log(fileImage);
    } else {
      responseData.success = false;
    }
  } catch (error) {
    console.log(error);
    responseData.success = false;
  } finally {
    owner.release();
  }
  //   responseData._token = await common.commonService.generateToken(tokenObj);
  res.status(200).send(responseData);
  return res.end();
};

module.exports = exec;
