const pool = require("../../database/pool");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let user = await pool.connect();
  await user.query("BEGIN");
  let responseData = {};
  // console.log(req.body);
  try {
    let data = req.body;
    let bill = data[0];
    let cart = data[1];
    // console.log(data);
    //UUID
    let bill_uuid = uuid();
    let cart_uuid = uuid();
    //SQL
    let sql_bill = `INSERT INTO public.bills
(bill_id, bill_date, total_price, last_price, bill_status, user_id, promotion_id, restaurant_id, driver_id, create_date, paymethod, shipping_cost, user_latitude, user_longitude, addres_detail, note_to_driver)
VALUES($1, Date(), $2, $3, $4, $5, $6, $7, '', now(), $8, $9, $10, $11, $12, $13);`;
    let sql_cart = `INSERT INTO public.cart
(cart_id, menu_id, price, create_date, create_by, amount, bill_id)
VALUES($1, $2, $3, now(), $4, $5, $6);`;
    //PARAM
    let param = [
      bill_uuid,
      bill.totalprice,
      bill.last_price,
      "Find Driver",
      bill.user_id,
      bill.promotion_id,
      bill.restaurant_id,
      bill.paymethod,
      bill.deliveryCost,
      bill.user_latitude,
      bill.user_longitude,
      bill.address_detail,
      bill.note_to_driver,
    ];

    for (let i = 0; i < cart.length; i++) {
      let param_cart = [
        cart_uuid,
        cart[i].menu_id,
        cart[i].menu_price,
        bill.user_id,
        cart[i].amount,
        bill_uuid,
      ];
      console.log(param_cart);
    }
    // let response = await pool.query(sql);
    // console.log(param);

    //RESPONSE IF SUCCESS
    // responseData.success = true;
    // responseData.data = response.rows;
    // console.log(responseData.data);
    user.query("COMMIT");
  } catch (error) {
    user.query("ROLLBACK");
    responseData.success = false;
    responseData.data = "something error try again!";
    console.log(error);
  } finally {
    user.release();
  }

  res.status(200).send(responseData);
  return res.end();
};
module.exports = exec;
