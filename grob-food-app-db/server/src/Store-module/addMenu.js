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
    let menu_uuid = uuid();
    let sql = `INSERT INTO public.menus
(menu_id, menu_name, price, restaurant_topic_id, food_catagory, create_date, update_date, update_by)
VALUES($1, $2, $3, $4, $5, now(), now(), $6);`;
    let param = [
      menu_uuid,
      data.menu_name,
      data.menu_price,
      data.restaurant_topic_id,
      data.menu_catagory,
      data.owner_id,
    ];
    let response = await pool.query(sql, param);
    console.log(response);
    responseData.success = true;
    responseData.data = "Create New Menu Succesful";
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
