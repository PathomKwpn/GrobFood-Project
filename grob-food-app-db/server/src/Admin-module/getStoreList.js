const pool = require("../../database/pool");

const exec = async (req, res) => {
  let store = await pool.connect();
  await store.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;

    let sql = `SELECT * FROM public.restaurants;`;
    let response = await pool.query(sql);
    responseData.success = true;
    responseData.data = response.rows;
    store.query("COMMIT");
  } catch (error) {
    store.query("ROLLBACK");
    responseData.success = false;
    responseData.data = "getStoreList error try again!";
    console.log(error);
  } finally {
    store.release();
  }

  res.status(200).send(responseData);
  return res.end();
};
module.exports = exec;
