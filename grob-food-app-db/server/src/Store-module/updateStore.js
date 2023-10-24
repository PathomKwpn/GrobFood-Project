const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let store = await pool.connect();
  await store.query("BEGIN");
  let responseData = {};

  try {
    let data = req.body;
    let id = "fb4ceb54-d7a0-4b52-8d4c-2cc00db822e0";
    console.log("data", data);
    // let sqlUser = `select * from owner o
    // join restaurants r on o.owner_id  = r.owner_id
    // where o.owner_id = $1;`;
    // // console.log(sqlUser, "user_username");
    // let paramUser = [data.owner_id];
    // // console.log(paramUser, "This is paramUser");
    // let responseUser = await pool.query(sqlUser, paramUser);
    // // console.log(responseUser);

    // if (responseUser.rowCount > 0) {
    //   responseData.success = false;
    //   responseData.data = "User duplicate";
    // } else {
    //   let restaurant_uuid = uuid();
    let sql = `UPDATE public.restaurants
SET restaurant_name=$2, address=$3,  update_date=now(), update_by=$1, close_time=$4, open_time=$5, restaurant_catagory=$6
WHERE restaurant_id=$7;`;
    let param = [
      data.owner_id,
      data.restaurant_name,
      data.address,
      data.close_time,
      data.open_time,
      data.restaurant_catagory,
      data.restaurant_id,
    ];
    //   let restaurant_image_id = uuid();
    //   let sql2 = `INSERT INTO public.restaurants_image
    //   (restaurants_image_id, restaurants_image_url, restaurants_id, create_date, create_by)
    //   VALUES($1, $2, $3, now(), $3);`;
    //   let param2 = [
    //     restaurant_image_id,
    //     data.restaurant_image_url,
    //     restaurant_uuid,
    //   ];
    let response = await pool.query(sql, param);
    //   let response2 = await pool.query(sql2, param2);
    console.log(response);
    //   console.log(response2);
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
