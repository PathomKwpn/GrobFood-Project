const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let store = await pool.connect();
  await store.query("BEGIN");
  let responseData = {};
  let data = req.body;
  console.log(data, "data");
  let param = [data.owner_id];
  try {
    let sql_getMenu_PathImage = `select menu_image_url  from menu_image where menu_id in 
                (select menu_id from menus where restaurant_topic_id in 
            (select restaurant_topic_id from restaurant_topic where restaurant_id in
            (select restaurant_id from restaurants where owner_id = $1 )));`;
    let menu_pathImage = await pool.query(sql_getMenu_PathImage, param);
    let list_menu_pathImage = menu_pathImage.rows;
    console.log(list_menu_pathImage);
    let sql_getRes_PathImage = `select restaurants_image_url from restaurants_image ri  where restaurants_id in(select restaurant_id from restaurants r where owner_id = $1);`;
    let res_pathImage = await pool.query(sql_getRes_PathImage, param);
    let list_res_pathImage = res_pathImage.rows;
    console.log(list_res_pathImage);
    list_res_pathImage.map((item) => {
      common.commonService.deleteFile(item.restaurants_image_url);
    });
    list_menu_pathImage.map((item) => {
      common.commonService.deleteFile(item.menu_image_url);
    });

    let sql_del_img = `delete from menu_image where menu_id in 
                (select menu_id from menus where restaurant_topic_id in 
                (select restaurant_topic_id from restaurant_topic where restaurant_id in
                (select restaurant_id from restaurants where owner_id = $1 )));`;
    let sql_del_menus = `delete from menus m where restaurant_topic_id in 
                (select restaurant_topic_id from restaurant_topic where restaurant_id in 
                (select restaurant_id from restaurants r where owner_id = $1));`;

    let sql_del_topic = `delete from restaurant_topic rt where restaurant_topic_id in
                (select restaurant_topic_id from restaurants r where owner_id =$1);`;
    let sql_del_restaurant = `delete from restaurants r where owner_id = $1;`;

    let delete_menus = await pool.query(sql_del_menus, param);
    let delete_topic = await pool.query(sql_del_topic, param);
    let delete_restaurant = await pool.query(sql_del_restaurant, param);
    responseData.success = true;
    responseData.data = "Delete Store Succesful";
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
