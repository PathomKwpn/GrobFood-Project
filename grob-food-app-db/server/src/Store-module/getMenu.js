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

    let sql = `SELECT m.menu_id, menu_name, price, m.restaurant_topic_id, food_catagory,mi.menu_image_url ,mi.menu_image_id 
FROM public.menus m
join menu_image mi on m.menu_id = mi.menu_id
join restaurant_topic rt on m.restaurant_topic_id = rt.restaurant_topic_id
where m.restaurant_topic_id = '${data.restaurant_topic_id}';`;
    let param = [data.owner_id];
    let response = await pool.query(sql);
    console.log(response);

    response.rows.map((item) => {
      const fileImage = common.commonService.pathFileToBaes64(
        item.menu_image_url
      );
      item.menu_image_url = fileImage;
    });
    responseData.success = true;
    responseData.data = response.rows;
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
