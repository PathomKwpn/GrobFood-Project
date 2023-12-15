const pool = require("../../database/pool");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let user = await pool.connect();
  await user.query("BEGIN");
  let responseData = {};

  try {
    let data = req.body;
    let cart = data;

    //UUID
    let cart_uuid = uuid();
    //SQL
    let sql_cart = `INSERT INTO public.cart
(cart_id, menu_id, price, create_date, create_by, amount, bill_id,menu_name)
VALUES($1, $2, $3, now(), $4, $5, $6,$7);`;
    //PARAM
    for (let i = 0; i < cart.length; i++) {
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
    let response = await pool.query(sql_bill, param);

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
