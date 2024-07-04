const db = require("../lib/db");
const jwt = require("jsonwebtoken");
const key = "issa";
const bcrypt = require("bcrypt");

function getAllUsers() {
  return db.query("SELECT * FROM users  WHERE is_deleted=false");
}

function getAllData(limit, offset) {
  const query = `
  SELECT * FROM users 
WHERE is_deleted = false OR is_deleted = true
LIMIT $1 OFFSET $2;

  `;
  console.log("I am here ", limit, offset);
  return db.query(query, [limit, offset]);
}
const getUserById = async (user_id) => {
  const queryText = "SELECT * FROM users WHERE user_id = $1";
  const values = [user_id];
  const result = await db.query(queryText, values);
  return result.rows[0]; // Assuming user_id is unique, so only one row is expected
};

const insertUser = async (displayName, emails, photoss, role, id,) => {
  try {
    const result = await db.query(
      "INSERT INTO users ( username, email, user_img,role,google_id) VALUES ($1, $2, $3, $4,$5)  RETURNING *",
      [displayName, emails, photoss, role, id,]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

function getUser(user_id) {
  const queryText =
    "SELECT * FROM users WHERE user_id = $1 AND is_deleted = false";
  const value = [user_id];
  return db.query(queryText, value);
}
function getEmail(email) {
  console.log("email", email)

  const queryText = "SELECT * FROM users WHERE email = $1";
  const value = [email];
  console.log("lllllllll", db.query(queryText, value))
  return db.query(queryText, value);

}
// function newUser(username, email, password) {
//   const queryText =
//     "INSERT INTO users (username, email, password) VALUES ($1,$2,$3)";
//   const values = [username, email, password];
//   return db.query(queryText, values);
// }
// يفترض أن هناك اتصالاً بقاعدة البيانات ويتم تخزينه في db
const setActiveStatus = async (user_id, active) => {
  try {
    const query = `
      UPDATE users
      SET active = $1
      WHERE user_id = $2
    `;

    await db.query(query, [active, user_id]);
  } catch (error) {
    throw error;
  }
};

const getTotalCounts = async () => {
  const result = await db.query(
    "SELECT COUNT(*) FROM users WHERE is_deleted = false"
  );
  return result.rows[0].count;
};

function newUser(username, email, password, role, user_img) {
  // const user_img = picture;
  // Hash the password before inserting it into the database
  return bcrypt.hash(password, 10).then((hashedPassword) => {
    const queryText =
      "INSERT INTO users (username, email, password , role ,user_img)  VALUES ($1, $2, $3 ,$4,$5) ";
    const values = [username, email, hashedPassword, role, user_img];
    return db.query(queryText, values);
  });
}

function deleteUser(user_id) {
  const queryText = "UPDATE users SET is_deleted = true WHERE user_id = $1";
  const value = [user_id];
  return db.query(queryText, value);
}
function Undo(user_id) {
  const queryText = "UPDATE users SET is_deleted = false WHERE user_id = $1";
  const value = [user_id];
  return db.query(queryText, value);
}

// function updateUser(user_id, username, email, password) {
//   const queryText =
//     "UPDATE users  SET username = $2, email = $3, password = $4  WHERE user_id = $1   RETURNING * ";
//   const value = [user_id, username, email, password];
//   return db.query(queryText, value);
// }
function updateUser(
  user_id,
  username,
  email,

  phone_number,
  birthday
) {

  const queryText = `
    UPDATE users 
    SET 
      username = COALESCE($2, username), 
      email = COALESCE($3, email), 
     
      
      phone_number = COALESCE($4, phone_number),
      birthday = COALESCE($5, birthday)
    WHERE 
      user_id = $1 
    RETURNING *`;

  const values = [user_id, username, email, phone_number, birthday];
  return db.query(queryText, values);
}



function updateUsers(
  user_id, username, email, user_img, role, google_id
) {

  const queryText = `
    UPDATE users 
    SET 
    username = COALESCE($2, username), 
    email = COALESCE($3, email), 
     
      
    user_img = COALESCE($4, user_img),
    role = COALESCE($5, role),
    google_id = COALESCE($6, google_id)
    WHERE 
      user_id = $1 
    RETURNING *`;

  const values = [user_id, username, email, user_img, role, google_id];
  return db.query(queryText, values);
}
function updatedImage(
  user_id,

  user_img
) {
  const queryText = `
    UPDATE users 
    SET 

     
      user_img = COALESCE($2, user_img)

    WHERE 
      user_id = $1 
    RETURNING *`;

  const values = [user_id, user_img];
  return db.query(queryText, values);
}

function decodeToken(token, key) {
  let userData = {};
  jwt.verify(token, key, (err, decoded) => {
    // console.log("token");
    // console.log(token);
    // console.log(key);
    // console.log(decoded);
    // console.log("decoded");
    userData = decoded;
    return decoded;
  });

  return userData;
}
function loginUser(user_id, email, password) {
  const queryText =
    "UPDATE users  SET  email = $3, password = $4  WHERE user_id = $1";
  const value = [user_id, email, password];
  return db.query(queryText, value);
}
function getEmailAdmin(email) {
  const queryText = "SELECT * FROM users WHERE email = $1";
  const value = [email];
  return db.query(queryText, value);
}

const updatePassword = async (user_id, hashedPassword) => {
  const queryText = `
    UPDATE users 
    SET 
      password = $2
    WHERE 
      user_id = $1 
    RETURNING *`;

  const values = [user_id, hashedPassword];
  return db.query(queryText, values);
};
const updatePasswordd = async (email, hashedPassword) => {
  const queryText = `
    UPDATE users 
    SET 
      password = $2
    WHERE 
      email = $1 
    RETURNING *`;

  const values = [email, hashedPassword];
  return db.query(queryText, values);
};

async function UserProfile(user_id) {
  const queryText =
    "SELECT  workshops.workshop_name as workshop_name, workshops.workshop_dis as workshop_dis, workshops.workshop_title as workshop_title ,workshops.workshop_start as workshop_start,workshops.workshop_end as workshop_end " +
    "FROM workshop_bookings " +
    "JOIN workshops ON workshop_bookings.workshop_id = workshops.workshop_id " +
    "WHERE (user_id = $1 )";
  const values = [user_id];

  return db.query(queryText, values);
}

// ...

// async function getUserByEmail(email) {
//   const queryText = 'SELECT * FROM users WHERE email = $1';
//   const value = [email];

//   try {
//     const result = await db.query(queryText, value);
//     return result.rows[0];
//   } catch (error) {
//     console.error("Error getting user by email:", error);
//     throw error; // Re-throw the error to be caught by the calling function
//   }
// }

// async function getUserByResetToken(password) {
//   try {
//     const result = await db.query('SELECT * FROM users WHERE password = $1', [password]);
//     return result.rows[0];
//   } catch (error) {
//     console.error("Error getting user by reset token:", error);
//     throw error; // Re-throw the error to be caught by the calling function
//   }
// }

// ...

module.exports = {
  getAllUsers,
  getAllData,
  newUser,
  getUser,
  deleteUser,
  updateUser,
  getEmail,
  decodeToken,
  loginUser,
  UserProfile,
  setActiveStatus,
  getEmailAdmin,
  updatePassword,
  getUserById,
  getTotalCounts,
  updatedImage,
  // getUserByEmail,
  // getUserByResetToken
  updatePasswordd,
  Undo,
  insertUser,
  updateUsers
};
