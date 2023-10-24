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
    let sql = `INSERT INTO public.restaurant_topic
(restaurant_topic_id, restaurant_topic_name, restaurant_id)
VALUES($1, $2, $3);`;
    let param = [
      restaurant_topic_uuid,
      data.restaurant_topic_name,
      data.restaurant_id,
    ];
    let response = await pool.query(sql, param);
    console.log(response);
    responseData.success = true;
    responseData.data = "Create New Topic Succesful";
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
