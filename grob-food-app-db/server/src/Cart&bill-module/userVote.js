const pool = require("../../database/pool");
const common = require("../common/commonService");
const { uuid } = require("uuidv4");

const exec = async (req, res) => {
  let user = await pool.connect();
  await user.query("BEGIN");
  let responseData = {};
  let newScoreRestaurant = 0;
  let newScoreDriver = 0;
  try {
    let data = req.body;
    let rating_id = uuid();
    console.log(data, "DATA");
    let param = [
      rating_id,
      data.bill_id,
      data.user_id,
      data.restaurant_id,
      data.restaurant_score,
      data.driver_id,
      data.driver_score,
    ];
    console.log(param);
    let param_finish = [data.bill_id];
    let sql_finishBill = `UPDATE public.bills
SET vote_status='success',bill_status='order success'
WHERE bill_id=$1;`;
    let response_finishBill = await pool.query(sql_finishBill, param_finish);
    let sql_addRating = `INSERT INTO public.rating
(rating_id, user_id, restaurant_id, create_date, driver_id, driver_score, restaurant_score,bill_id)
VALUES($1, $3, $4, now(), $6, $7, $5,$2);`;
    let response = await pool.query(sql_addRating, param);
    let param2 = [data.restaurant_id];
    let sql_getAllRatingRestaurant = `SELECT restaurant_score FROM public.rating where restaurant_id = $1;`;
    let param3 = [data.driver_id];
    let sql_getAllRatingDriver = `SELECT driver_score FROM public.rating where driver_id = $1;`;
    let responseGetAllRatingRestaurant = await pool.query(
      sql_getAllRatingRestaurant,
      param2
    );
    let responseGetAllRatingDriver = await pool.query(
      sql_getAllRatingDriver,
      param3
    );
    for (let i = 0; i < responseGetAllRatingRestaurant.rows.length; i++) {
      newScoreRestaurant +=
        responseGetAllRatingRestaurant.rows[i].restaurant_score;
    }
    for (let i = 0; i < responseGetAllRatingDriver.rows.length; i++) {
      newScoreDriver += responseGetAllRatingDriver.rows[i].driver_score;
    }

    //NEW SCORE DRIVER
    newScoreDriver = newScoreDriver / responseGetAllRatingDriver.rows.length;

    //NEW SCORE RESTAURANT
    newScoreRestaurant =
      newScoreRestaurant / responseGetAllRatingRestaurant.rows.length;
    console.log(newScoreDriver, newScoreRestaurant);

    //UPDATE SCORE DRIVER
    let param_updateDriverScore = [data.driver_id, newScoreDriver];
    let sql_updateDriver_score = `UPDATE public.driver
    SET update_date=now(), score=$2
    WHERE driver_id=$1;`;
    let sql_UpdateResScore = await pool.query(
      sql_updateDriver_score,
      param_updateDriverScore
    );

    //UPDATE SCORE RESTAURANT
    let param_updateResScore = [data.restaurant_id, newScoreRestaurant];
    let sql_updateRestaurant_score = `UPDATE public.restaurants
    SET score=$2, update_date=now()
    WHERE restaurant_id=$1;`;
    let sql_UpdateDriverScore = await pool.query(
      sql_updateRestaurant_score,
      param_updateResScore
    );
    responseData.success = true;

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
