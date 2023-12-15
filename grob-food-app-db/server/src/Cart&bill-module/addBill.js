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
    let sql = `select * from bills b where user_id =$1 and (bill_status != 'order success' or vote_status = 'none');`;
    let param = [bill.user_id];
    let responseUser = await pool.query(sql, param);
    // console.log(responseUser.rowCount, "ROWCOUNT");
    if (responseUser.rowCount >= 1) {
      responseData.success = false;
      responseData.data = "คุณมีคำสั่งซื้อที่กำลังดำเนินการอยู่";
    } else if (responseUser.rowCount < 1) {
      // console.log(data);
      //UUID
      let bill_uuid = uuid();
      //SQL
      let sql_bill = `INSERT INTO public.bills
(bill_id, bill_date, total_price, last_price, bill_status, user_id, coupon_id, restaurant_id, driver_id, create_date, paymethod, shipping_cost, user_latitude, user_longitude, addres_detail, note_to_driver,discount)
VALUES($1,now(), $2, $3, $4, $5, $6, $7, '', now(), $8, $9, $10, $11, $12, $13,$14);`;
      let sql_cart = `INSERT INTO public.cart
(cart_id, menu_id, price, create_date, create_by, amount, bill_id,menu_name)
VALUES($1, $2, $3, now(), $4, $5, $6,$7);`;
      //PARAM
      let param_bill = [
        bill_uuid,
        bill.totalprice,
        bill.lastprice,
        "Find Driver",
        bill.user_id,
        bill.coupon_id,
        bill.restaurant_id,
        bill.paymethod,
        bill.deliveryCost,
        bill.user_latitude,
        bill.user_longitude,
        bill.addressDetail,
        bill.notetoDriver,
        bill.discount,
      ];
      for (let i = 0; i < cart.length; i++) {
        let cart_uuid = uuid();
        let param_cart = [
          cart_uuid,
          cart[i].menu_id,
          cart[i].menu_price,
          bill.user_id,
          cart[i].amount,
          bill_uuid,
          cart[i].menu_name,
        ];
        let response_cart = await pool.query(sql_cart, param_cart);
      }
      let response = await pool.query(sql_bill, param_bill);

      //RESPONSE IF SUCCESS
      responseData.success = true;
      responseData.data = response.rows;
      // console.log(responseData.data);
      user.query("COMMIT");
    }
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
