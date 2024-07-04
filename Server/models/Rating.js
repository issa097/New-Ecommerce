const db = require("../lib/db");


async function createRating(user_id, product_id, rating, comment) {
  console.log(product_id);
  try {
    const hasPurchased = await db.query(
      `SELECT * FROM payment WHERE user_id = $1 AND $2 = ANY(product_id)`,
      [user_id, product_id]
    );

    if (hasPurchased?.rows?.length == 0) {
      return { error: "User has not purchased the product." };
    }

    const newRating = await db.query(
      "INSERT INTO ratings(user_id, product_id, rating, comment, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [user_id, product_id, rating, comment, new Date()]
    );
    const updatedProduct = await db.query(
      "UPDATE products SET product_rating = (SELECT ROUND(AVG(rating), 1) FROM ratings WHERE product_id = $1) WHERE product_id = $1 ",
      [product_id]
    );

    return {
      newRating: newRating.rows[0],
      updatedProduct: updatedProduct.rows[0],
    };
  } catch (error) {
    throw error;
  }
}

function getAllRating() {
  return db.query("SELECT * FROM ratings");
}

function getRatingByUserAndProduct(user_id, product_id) {
  const queryText =
    "SELECT * FROM ratings WHERE user_id = $1 AND product_id = $2";

  // "SELECT c.comment_text, u.username FROM comments c " +
  // "JOIN users u ON c.user_id = u.user_id " +
  // "WHERE c.user_id = $1 AND c.product_id = $2",
  const valuse = [user_id, product_id];

  return db.query(queryText, valuse);
}
function getRatingByUser(user_id) {
  const queryText = "SELECT * FROM ratings WHERE user_id = $1 ";

  // "SELECT c.comment_text, u.username FROM comments c " +
  // "JOIN users u ON c.user_id = u.user_id " +
  // "WHERE c.user_id = $1 AND c.product_id = $2",
  const valuse = [user_id];

  return db.query(queryText, valuse);
}

function getRatingByproduct(product_id) {
  const queryText = `  SELECT 
  ratings.rating_id,
  ratings.user_id,
  ratings.product_id,
  ratings.rating,
  ratings.comment,
  ratings.created_at,
  ratings.is_deleted AS rating_is_deleted,
  users.username
FROM ratings
JOIN users ON ratings.user_id = users.user_id
WHERE ratings.product_id = $1 AND ratings.is_deleted = false;
`;

  // "SELECT c.comment_text, u.username FROM comments c " +
  // "JOIN users u ON c.user_id = u.user_id " +
  // "WHERE c.user_id = $1 AND c.product_id = $2",
  const valuse = [product_id];

  return db.query(queryText, valuse);
}

function updateS(
  rating_id,
  user_id,
  product_id,
  rating,
  comment,
  created_at,
  is_deleted
) {
  const queryText = `
    UPDATE ratings 
    SET 
      user_id = COALESCE($2, user_id),
      product_id = COALESCE($3, product_id),
      rating = COALESCE($4, rating),
      comment = COALESCE($5, comment),
      created_at = COALESCE($6, created_at),
      is_deleted = COALESCE($7, is_deleted)
    WHERE 
    rating_id = $1 
    RETURNING *`;

  const values = [
    rating_id,
    user_id,
    product_id,
    rating,
    comment,
    created_at,
    is_deleted,
  ];

  return db.query(queryText, values);
}

function SoftDeletes(rating_id) {
  const queryText =
    "UPDATE ratings SET is_deleted = true WHERE rating_id = $1 AND is_deleted = false RETURNING *";
  const valuse = [rating_id];
  return db.query(queryText, valuse);
}

module.exports = {
  createRating,
  getAllRating,
  getRatingByUserAndProduct,
  getRatingByUser,
  getRatingByproduct,
  SoftDeletes,
  updateS,
};
