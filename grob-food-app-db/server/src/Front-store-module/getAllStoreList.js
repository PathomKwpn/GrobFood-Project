const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let store = await pool.connect();
  await store.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;
    console.log(data);
    let restaurant_topic_uuid = uuid();

    let sql = `select r.restaurant_id,ri.restaurants_image_url,restaurant_name ,restaurant_catagory ,close_time ,open_time,r.score, r.latitude,r.longitude  from restaurants r 
join restaurants_image ri on r.restaurant_id = ri.restaurants_id where status = 'Allow' ;`;
    let param = [data.owner_id];
    let response = await pool.query(sql);

    response.rows.map((item) => {
      console.log(item.restaurants_image_url);
      const fileImage = common.commonService.pathFileToBaes64(
        item.restaurants_image_url
      );

      item.restaurants_image_url = fileImage;
    });
    responseData.success = true;
    responseData.data = response.rows;

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
