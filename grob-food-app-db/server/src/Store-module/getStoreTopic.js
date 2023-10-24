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
    let sql = `SELECT restaurant_topic_id, restaurant_topic_name, t.restaurant_id,o.owner_id 
FROM public.restaurant_topic t
join restaurants r on t.restaurant_id = r.restaurant_id
join "owner" o on r.owner_id = o.owner_id 
where o.owner_id = $1;`;
    let param = [data.owner_id];
    let response = await pool.query(sql, param);
    console.log(response);
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
