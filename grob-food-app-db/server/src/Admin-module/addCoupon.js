const pool = require("../../database/pool");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let admin = await pool.connect();
  await admin.query("BEGIN");
  let responseData = {};
  try {
    let data = req.body;
    console.log(data);
    let coupon_uuid = uuid();
    let sql = `INSERT INTO public.coupon
(coupon_id, coupon_name, start_date, expire_date, discount_value, discount_type, min_totalprice, max_discount, create_date)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, now());`;
    let param = [
      coupon_uuid,
      data.coupon_name,
      data.start_date,
      data.expire_date,
      data.discount_value,
      data.discount_type,
      data.min_totalprice,
      data.max_discount,
    ];
    let response = await pool.query(sql, param);
    console.log(response);
    responseData.success = true;
    responseData.data = "Create New Coupon Succesful";
    admin.query("COMMIT");
  } catch (error) {
    admin.query("ROLLBACK");
    responseData.success = false;
    responseData.data = "something error try again!";
    console.log(error);
  } finally {
    admin.release();
  }

  res.status(200).send(responseData);
  return res.end();
};
module.exports = exec;
