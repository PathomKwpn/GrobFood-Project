const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let app = await pool.connect();
  await app.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;
    console.log(data);
    //UUID
    let bill_uuid = uuid();
    let cart_uuid = uuid();
    //SQL
    let sql_bill = `INSERT INTO public.bills
(bill_id, bill_date, total_price, last_price, bill_status, user_id, promotion_id, restaurant_id, driver_id, create_date, paymethod, shipping_cost, user_latitude, user_longitude, addres_detail, note_to_driver)
VALUES(bill_uuid, Date(), 0, 0, '', '', '', '', '', '', '', 0, '', '', '', '');`;
    //PARAM
    let param = [data.totalprice, data];
    let response = await pool.query(sql);
    console.log(response);

    //RESPONSE IF SUCCESS
    responseData.success = true;
    responseData.data = response.rows;
    console.log(responseData.data);
    app.query("COMMIT");
  } catch (error) {
    app.query("ROLLBACK");
    responseData.success = false;
    responseData.data = "something error try again!";
    console.log(error);
  } finally {
    app.release();
  }

  res.status(200).send(responseData);
  return res.end();
};
module.exports = exec;
