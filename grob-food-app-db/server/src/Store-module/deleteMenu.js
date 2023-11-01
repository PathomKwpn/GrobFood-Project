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
    let getPathImage = `select menu_image_url from menu_image mi 
where menu_id = $1;`;
    let sql = `DELETE FROM public.menu_image
WHERE menu_image_id=$1;`;
    let sql2 = `DELETE FROM public.menus
WHERE menu_id=$1;`;
    let param = [data.menu_image_id];
    let param2 = [data.menu_id];
    let PathImage = await pool.query(getPathImage, param2);
    console.log(PathImage.rows[0].menu_image_url);
    common.commonService.deleteFile(PathImage.rows[0].menu_image_url);
    let response = await pool.query(sql, param);
    let response2 = await pool.query(sql2, param2);
    responseData.success = true;
    responseData.data = "Delete Menu Successful";
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
