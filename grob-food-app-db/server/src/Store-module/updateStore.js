const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let store = await pool.connect();
  await store.query("BEGIN");
  let responseData = {};

  try {
    let data = req.body;
    console.log("data", data);
    let sql = `UPDATE public.restaurants
SET restaurant_name=$2, address=$3,  update_date=now(), update_by=$1, close_time=$4, open_time=$5, restaurant_catagory=$6,latitude =$8,longitude=$9
WHERE restaurant_id=$7;`;
    let param = [
      data.owner_id,
      data.restaurant_name,
      data.address,
      data.close_time,
      data.open_time,
      data.restaurant_catagory,
      data.restaurant_id,
      data.latitude,
      data.longitude,
    ];

    let response = await pool.query(sql, param);
    console.log(response);
    responseData.success = true;
    responseData.data = "Register Succesful";
    store.query("COMMIT");
    // }
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
