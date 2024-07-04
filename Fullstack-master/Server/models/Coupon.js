const db = require("../lib/db");

function createCoupon(code, discountPercentage) {
  const queryText =
    "INSERT INTO coupons (code, discount_percentage) VALUES ($1, $2) RETURNING *";
  const result = [code, discountPercentage];
  try {
    return db.query(queryText, result);
  } catch (error) {
    throw error;
  }
}

function getCouponByCode(code) {
  const queryText = "SELECT * FROM coupons WHERE code = $1";
  const result = [code];

  try {
    return db.query(queryText, result);
  } catch (error) {
    throw error;
  }
}
function getCoupons() {
  const queryText = "SELECT * FROM coupons WHERE is_deleted = false";

  try {
    return db.query(queryText);
  } catch (error) {
    throw error;
  }
}

function getCouponspagi(limit, offset) {
  const query = `
    SELECT * FROM coupons 
    WHERE is_deleted = false
    LIMIT $1 OFFSET $2
  `;
  console.log("I am here ", limit, offset);
  return db.query(query, [limit, offset]);
}
const getTotalCount = async () => {
  const result = await db.query(
    "SELECT COUNT(*) FROM coupons WHERE is_deleted = false"
  );
  return result.rows[0].count;
};

function getCouponByid(id) {
  const queryText = "SELECT * FROM coupons WHERE id = $1";
  const result = [id];

  try {
    return db.query(queryText, result);
  } catch (error) {
    throw error;
  }
}

const deleteCoupon = async (id) => {
  const queryText =
    "UPDATE coupons SET is_deleted = true WHERE id = $1 AND is_deleted = false RETURNING *";
  const result = [id];

  try {
    return db.query(queryText, result);
  } catch (error) {
    throw error;
  }
};
const calculateDiscountedTotal = (discount_percentage, cart) => {
  console.log("object", discount_percentage);
  const originalTotal = cart.reduce((acc, item) => acc + item.price* item.quantity, 0);
  const discountAmount = (originalTotal * discount_percentage) / 100;
  const discountedTotal = originalTotal - discountAmount;
  console.log("ddddd", originalTotal, discountAmount, discountedTotal);
  console.log("object", cart);

  return discountedTotal;
};

module.exports = {
  createCoupon,
  getCouponByCode,
  deleteCoupon,
  calculateDiscountedTotal,
  getCouponByid,
  getCoupons,
  getCouponspagi,
  getTotalCount,
};
