const pool = require("../../database/pool");
const common = require("../common/commonService");

const exec = async (req, res) => {
  let store = await pool.connect();
  await store.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;
    console.log(data);
    let sql_to_getStoreDetail = `select r.restaurant_id,r.score,restaurant_name,ri.restaurants_image_url ,restaurant_catagory ,close_time ,open_time,rt.restaurant_topic_name ,mi.menu_image_url ,m.menu_name ,m.price from restaurants r 
join restaurants_image ri on r.restaurant_id = ri.restaurants_id 
join restaurant_topic rt on r.restaurant_id =rt.restaurant_id 
join menus m on m.restaurant_topic_id = rt.restaurant_topic_id
join menu_image mi on mi.menu_id = m.menu_id 
where r.restaurant_id = $1;
`;
    let param = [data.restaurant_id];
    let response = await pool.query(sql_to_getStoreDetail, param);

    let sql_to_getStoreTopic = `select rt.restaurant_topic_name,rt.restaurant_topic_id  from restaurants r 
join restaurants_image ri on r.restaurant_id = ri.restaurants_id 
join restaurant_topic rt on r.restaurant_id =rt.restaurant_id 
where r.restaurant_id = $1;
`;
    let response_topic = await pool.query(sql_to_getStoreTopic, param);

    response.rows.map((item) => {
      const restaurantImage = common.commonService.pathFileToBaes64(
        item.restaurants_image_url
      );
      item.restaurants_image_url = restaurantImage;
      const fileImage = common.commonService.pathFileToBaes64(
        item.menu_image_url
      );
      item.menu_image_url = fileImage;
    });
    responseData.success = true;
    responseData.data = response.rows;
    responseData.topic = response_topic.rows;
    console.log(responseData.data);
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
