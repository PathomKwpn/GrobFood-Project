const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let store = await pool.connect();
  await store.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;
    // console.log(data);
    let sqlUser = `select * from owner o
    join restaurants r on o.owner_id  = r.owner_id
    where o.owner_id = $1;`;
    // console.log(sqlUser, "user_username");
    let paramUser = [data.owner_id];
    // console.log(paramUser, "This is paramUser");
    let responseUser = await pool.query(sqlUser, paramUser);
    // console.log(responseUser);

    if (responseUser.rowCount < 0) {
      responseData.success = false;
      responseData.data = "User duplicate";
    } else {
      let restaurant_uuid = uuid();
      let img_toserver = common.commonService.uploadFileByBase64(
        data.imageBase64,
        data.lastnameImage
      );
      // let sendimg = common.commonService.pathFileToBaes64(img_toserver);
      // console.log(sendimg);
      // console.log(img_toserver);
      let sql = `INSERT INTO public.restaurants
(restaurant_id, owner_id, restaurant_name, score, address, restaurant_credit, regis_date, update_date, update_by, close_time, open_time, restaurant_catagory)
VALUES($1, $2, $3, 0, $4, 0, now(), now(), $2, $5, $6, $7);`;
      let param = [
        restaurant_uuid,
        data.owner_id,
        data.restaurant_name,
        data.address,
        data.close_time,
        data.open_time,
        data.restaurant_catagory,
      ];
      let restaurant_image_id = uuid();
      let sql2 = `INSERT INTO public.restaurants_image
(restaurants_image_id, restaurants_image_url, restaurants_id, create_date, create_by, image_type)
VALUES($1, $2, $3, now(), $4, $5);`;
      let param2 = [
        restaurant_image_id,
        img_toserver,
        restaurant_uuid,
        data.owner_id,
        data.lastnameImage,
      ];
      let response = await pool.query(sql, param);
      let response2 = await pool.query(sql2, param2);
      console.log(response);
      console.log(response2);
      responseData.success = true;
      responseData.data = "Register Succesful";
      store.query("COMMIT");
    }
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
