const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let store = await pool.connect();
  await store.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;
    console.log(data, "data");
    let param = [data.restaurant_topic_id];
    let sql_check_topic_havemenu = `select menu_id from menus m
where restaurant_topic_id = $1;`;
    let response = await pool.query(sql_check_topic_havemenu, param);
    console.log(response.rowCount);
    let sql3 = `delete from restaurant_topic 
where restaurant_topic_id = $1;`;
    if (response.rowCount !== 0) {
      let sql_getMenu_id = `select m.menu_id,mi.menu_image_id, mi.menu_image_url from menus m
    join menu_image mi on m.menu_id = mi.menu_id
    where restaurant_topic_id = $1;`;
      let sql_delete_menu_image = `DELETE FROM public.menu_image
    WHERE menu_image_id=$1;`;
      let sql_delete_menu = `DELETE FROM public.menus
    WHERE menu_id=$1;`;
      let getMenu_id = await pool.query(sql_getMenu_id, param);
      let listMenu_id = getMenu_id.rows;
      console.log(listMenu_id);
      //DELETE IMAGE FILE
      listMenu_id.map(async (item) => {
        console.log(item, "item");
        let param_menu = [item.menu_id];
        let param_menu_image = [item.menu_image_id];
        let del_menu_image = await pool.query(
          sql_delete_menu_image,
          param_menu_image
        );
        let del_menu = await pool.query(sql_delete_menu, param_menu);

        common.commonService.deleteFile(item.menu_image_url);
      });
    }
    let del_topic = await pool.query(sql3, param);
    //     let sql = `delete from menu_image
    // where menu_id in (select menu_id from menus where restaurant_topic_id in (select restaurant_topic_id from restaurant_topic where restaurant_topic_id = $1));`;
    //     let sql2 = `delete from menus
    // where restaurant_topic_id = $1;`;

    // let response2 = await pool.query(sql2, param);

    // console.log(response3);
    responseData.success = true;
    responseData.data = "Delete Topic Succesful";
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
