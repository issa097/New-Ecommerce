// const db = require("../lib/db");

// function getAllblogs() {
//   return db.query("SELECT * FROM products");
// }
// function getBlog(product_id) {
//   const queryText = "SELECT * FROM products WHERE product_id = $1";
//   const value = [product_id];
//   return db.query(queryText, value);
// }
// // function getBlogid(user_id) {
// //   const queryText = "SELECT * FROM products WHERE user_id = $1";
// //   const value = [user_id];
// //   return db.query(queryText, value);
// // }
// // function getEmail(email) {
// //   const queryText = "SELECT * FROM blog WHERE email = $1";
// //   const value = [email];
// //   return db.query(queryText, value);
// // }
// function newblog(
//   product_name,
//   category_id,
//   price,
//   user_id,
//   product_img,
//   product_dis
// ) {
//   const queryText =
//     "INSERT INTO products ( product_name,  category_id ,price ,user_id,product_img ,product_dis) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";

//   const values = [
//     product_name,
//     category_id,
//     price,
//     user_id,
//     product_img,
//     product_dis,
//   ];
//   return db.query(queryText, values);
// }
// async function deleteblog(product_id) {
//   const queryText =
//     "UPDATE products SET is_deleted = true WHERE product_id = $1 AND is_deleted = false RETURNING*";
//   const values = [product_id];

//   try {
//     const result = await db.query(queryText, values);
//     console.log(result);

//     if (result.rowCount === 0) {
//       throw new Error("Product not found or already deleted.");
//     }

//     return result.rows[0].is_deleted === ture;
//   } catch (error) {
//     throw error;
//   }
// }

// function updateblog(
//   product_id,
//   product_name,
//   category_id,
//   price,
//   user_id,
//   product_img,
//   product_dis
// ) {
//   const queryText =
//     "UPDATE products SET product_name = $2, category_id = $3 ,price = $4 ,user_id=$5 ,product_img = $6 , product_dis =$7  WHERE product_id = $1 RETURNING *";

//   const value = [
//     product_id,
//     product_name,
//     category_id,
//     price,
//     user_id,
//     product_img,
//     product_dis,
//   ];
//   return db.query(queryText, value);
// }

// module.exports = {
//   getAllblogs,
//   newblog,
//   getBlog,
//   deleteblog,
//   updateblog,
//   //   getBlogid
//   // getEmail,
//   //   loginUser
// };

const db = require("../lib/db");

function getAllBlogs() {
  const query = `
    SELECT products.*, COALESCE(subcategory.sub_category_name, 'No Subcategory') AS sub_category_name, categories.category_name
    FROM products
    LEFT JOIN subcategory ON products.subcategory_id = subcategory.subcategory_id
    JOIN categories ON products.category_id = categories.category_id
    WHERE products.is_deleted = false
    ORDER BY products.product_rating DESC;
  `;
  return db.query(query);
}



// Assuming you have a 'products' table in your database
const getTotalCount = async () => {
  const result = await db.query(
    "SELECT COUNT(*) FROM products WHERE is_deleted = false"
  );
  return result.rows[0].count;
};

function getAllblogss(limit, offset) {
  const query = `
    SELECT * FROM products 
    WHERE is_deleted = false
    LIMIT $1 OFFSET $2
  `;
  console.log("I am here ", limit, offset);
  return db.query(query, [limit, offset]);
}

function getBlog(product_id) {
  const queryText =
    "SELECT * FROM products WHERE product_id = $1 AND is_deleted = false";
  const value = [product_id];
  return db.query(queryText, value);
}
function product(category_id) {
  const queryText =
    "SELECT * FROM products WHERE category_id = $1 AND is_deleted = false";
  const value = [category_id];
  return db.query(queryText, value);
}

async function newblog(
  product_name,
  category_name,
  price,
  user_id,
  product_img,
  product_dis,
  sub_category_name,

) {
  try {
    // الحصول على category_id باستخدام category_name
    const categoryQuery = "SELECT category_id FROM categories WHERE category_name = $1";
    const categoryValues = [category_name];
    const categoryResult = await db.query(categoryQuery, categoryValues);
    console.log(categoryResult)
    if (!categoryResult.rows.length === 0) {
      throw new Error('Category not found');
    }
    const category_id = categoryResult.rows[0].category_id;
    console.log("Category ID:", category_id);

    // الحصول على sub_category_id باستخدام sub_category_name
    const subCategoryQuery = "SELECT subcategory_id FROM subcategory WHERE sub_category_name = $1";
    console.log(subCategoryQuery)
    const subCategoryValues = [sub_category_name];
    console.log(subCategoryValues)
    const subCategoryResult = await db.query(subCategoryQuery, subCategoryValues);
    console.log(subCategoryResult)
    if (!subCategoryResult.rows.length === 0) {
      throw new Error('SubCategory not found');
    }
    const subcategory_id = subCategoryResult.rows[0].subcategory_id;
    console.log("SubCategory ID:", subcategory_id);

    // إدخال المنتج الجديد إلى قاعدة البيانات
    const insertQuery =
      "INSERT INTO products (product_name, category_id, price, user_id, product_img, product_dis,subcategory_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const insertValues = [
      product_name,
      category_id,

      price,
      user_id,
      product_img,
      product_dis,
      subcategory_id
    ];
    const result = await db.query(insertQuery, insertValues);
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting new product:', error);
    throw error;
  }
}


async function deleteproduct(product_id) {
  const queryText =
    "UPDATE products SET is_deleted = true WHERE product_id = $1 AND is_deleted = false RETURNING *";
  const values = [product_id];

  try {
    const result = await db.query(queryText, values);

    if (result.rowCount === 0) {
      throw new Error("Product not found or already deleted.");
    }

    return true; // Return true to indicate a successful deletion
  } catch (error) {
    throw error;
  }
}

// function updateblog(product_id, product_name, category_id, price, user_id, product_img, product_dis,is_deleted) {
//   const queryText = "UPDATE products SET product_name = $2, category_id = $3, price = $4, user_id = $5, product_img = $6, product_dis = $7,is_deleted = $8 WHERE product_id = $1  RETURNING *";
//   const value = [product_id, product_name, category_id, price, user_id, product_img, product_dis,is_deleted];
//   return db.query(queryText, value);
// }

function updateproduct(
  product_id,
  product_name,
  category_id,
  price,
  user_id,
  product_img,
  product_dis,
  is_deleted
) {
  const queryText = `
    UPDATE products 
    SET 
      product_name = COALESCE($2, product_name), 
      category_id = COALESCE($3, category_id), 
      price = COALESCE($4, price), 
      user_id = COALESCE($5, user_id), 
      product_img = COALESCE($6, product_img), 
      product_dis = COALESCE($7, product_dis),
      is_deleted = COALESCE($8, is_deleted)
    WHERE 
      product_id = $1 
    RETURNING *`;

  const values = [
    product_id,
    product_name,
    category_id,
    price,
    user_id,
    product_img,
    product_dis,
    is_deleted,
  ];
  return db.query(queryText, values);
}

module.exports = {
  getAllBlogs,
  newblog,
  getBlog,
  deleteproduct,
  updateproduct,
  getTotalCount,
  product,
  getAllblogss,
};
