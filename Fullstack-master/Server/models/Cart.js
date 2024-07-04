const db = require("../lib/db");

function additem(product_id, user_id, quantity) {
  const queryText = `INSERT INTO cart (product_id, user_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
  const result = [product_id, user_id, quantity];
  return db.query(queryText, result);
}

function GetItem(user_id) {
  const queryText = `SELECT products.product_name, products.price, products.product_img,products.product_id,cart.quantity,cart.cart_id FROM cart
    JOIN products ON cart.product_id = products.product_id
    WHERE cart.user_id = $1 AND cart.is_deleted = false;`;
  const result = [user_id];
  return db.query(queryText, result);
}

function updateCart(cart_id, quantity, is_deleted) {
  const queryText = `
    UPDATE cart 
    SET 
    quantity = COALESCE($2, quantity), 
    is_deleted = COALESCE($3, is_deleted)
    WHERE 
    cart_id = $1 
    RETURNING *`;

  const values = [cart_id, quantity, is_deleted];
  return db.query(queryText, values);
}
function updateCart2(product_id, quantity, is_deleted) {
  const queryText = `
    UPDATE cart 
    SET 
    quantity = COALESCE($2, quantity), 
    is_deleted = COALESCE($3, is_deleted)
    WHERE 
    product_id = $1 
    RETURNING *`;

  const values = [product_id, quantity, is_deleted];
  return db.query(queryText, values);
}

module.exports = {
  additem,
  GetItem,
  updateCart,
  updateCart2,
};
