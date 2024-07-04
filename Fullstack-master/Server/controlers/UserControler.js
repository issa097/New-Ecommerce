const User = require("../models/users");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const key = process.env.KEY;
require("dotenv").config();
// const nodemailer = require("nodemailer");
const nodemailer = require("nodemailer");
const Joi = require("joi");

const db = require("../lib/db");

const newUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(password);
    const role = "user";
    const existUser = await User.getEmail(email);

    if (existUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "User with the same email already exists" });
    }
    const newUser = await User.newUser(username, email, password, role);

    return res.status(200).json(newUser.rows);
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  // console.log(req);
  try {
    const page = req.params.page;
    const limit = 4;
    const offset = (page - 1) * limit;
    console.log("I am here", page, limit);
    console.log("🤣🤣🤣🤣🤣", page, limit);

    const result = await User.getAllData(limit, offset);
    console.log("issa");

    if (!result) {
      console.error("Error fetching blog data");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const totalCount = await User.getTotalCounts();

    if (totalCount === undefined || totalCount === null) {
      console.error("Error fetching total count");
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const totalPages = Math.ceil(totalCount / limit);

    const pagination = {
      current: page,
      prev: page > 1 ? page - 1 : null,
      next: page < totalPages ? parseInt(page) + 1 : null,
      total: totalPages,
    };

    res.json({ result, totalPages, pagination, limit });
  } catch (error) {
    console.error("Error in :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getUser = async (req, res) => {
  const user_id = req.user;
  console.log("sad",user_id)
  try {
    const result = await User.getUser(user_id);
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const getAllUsers = async (req, res) => {
  try {
    const result = await User.getAllUsers();
    console.log(result);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

// const updatePassword = async (req, res) => {
//   const user_id = req.user;
//   const { currentPassword, newPassword } = req.body;

//   try {
//     const user = await User.getUserById(user_id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isPasswordValid = await bcrypt.compare(
//       currentPassword,
//       user.password
//     );

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Current password is incorrect" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     const result = await User.updatePassword(user_id, hashedPassword);

//     return res.status(200).json(result.rows);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$")
    )
    .message(
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character. Minimum length is 8 characters."
    )
    .required(),
});

const updatePassword = async (req, res) => {
  const user_id = req.user;
  const { error, value } = updatePasswordSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });

  }


  const { currentPassword, newPassword } = value;

  try {
    const user = await User.getUserById(user_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await User.updatePassword(user_id, hashedPassword);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePasswordmailer = async (req, res) => {
  const {  password } = req.body;
  // console.log(email, password);

  try {
    // const user = await User.getEmail(email);

    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }

    // const isPasswordValid = await bcrypt.compare(
    //   user.password
    // );

    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Current password is incorrect" });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.updatePasswordd( hashedPassword);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const decode = (req, res) => {
  const { token } = req.body;
  try {
    const result = User.decodeToken(token, key);
    return res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};
const deleteUser = async (req, res) => {
  const user_id = req.params.id;
  try {
    const result = await User.deleteUser(user_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const Undo = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const result = await User.Undo(user_id);
    return res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const updateUser = async (req, res) => {
  const user_id = req.user;
  const { username, email, phone_number, birthday } = req.body;

  try {
    const result = await User.updateUser(
      user_id,
      username,
      email,

      phone_number,
      birthday
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const updatedImage = async (req, res) => {
  const user_id = req.user;
  const user_img = res.locals.site;
  console.log(user_img);

  // console.log(birthday);
  try {
    const result = await User.updatedImage(
      user_id,

      user_img
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await User.getEmail(email);
    console.log(result.rows);
    if (result.rows.length > 0) {
      const user = result.rows[0];

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { user_id: user.user_id, username: user.username, role: user.role },
          key
        );

        await User.setActiveStatus(user.user_id, true);

        console.log(token);
        // res.cookie("token", token);
        res.cookie("token", token, { httpOnly: true });

        return res.json({ user, token });
      } else {
        return res.json({ message: "Incorrect password" });
      }
    } else {
      return res.json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
const validateEmail = (email) => {
  return validator.isEmail(email);
};
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const result = await User.getEmailAdmin(email);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { user_id: user.user_id, username: user.username, role: user.role },
          key
        );

        await User.setActiveStatus(user.user_id, true);

        if (user.role === "user") {
          return res.status(403).json({ message: "You are not an admin." });
        }

        res.cookie("token", token, { httpOnly: true });

        return res.json({ user, token });
      } else {
        return res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const logout = async (req, res) => {
  const user_id = req.user;
  try {
    await User.setActiveStatus(user_id, false);
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const google = async (req, res) => {
  try {
    console.log("object");
    const { id, email, name, picture } = req.body;
    const user_img = picture;

    const role = "user";
    const existUser = await User.getEmail(email);

    if (existUser.rows.length > 0) {
      try {
        const user = existUser.rows[0];

        const token = jwt.sign(
          { user_id: user.user_id, username: user.username, role: user.role },
          key
        );
        await User.setActiveStatus(user.user_id, true);

        return res.json({ user, token });
      } catch (error) {
        throw error;
      }
    }
    const newUser = await User.newUser(name, email, id, role, user_img);

    return res.status(200).json(newUser.rows);
  } catch (error) {
    console.log(error);
  }
};

const getUserProfile = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const userBookings = await User.UserProfile(user_id);
    return res.status(200).json(userBookings.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "haddadissa44@gmail.com",
    pass: "muzp ydej rtsj arxx",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generatedVerificationCode = generateVerificationCode();

const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: "haddadissa44@gmail.com",
    to: email,
    subject: "Email Verification Code",
    text: `Your email verification code is: ${verificationCode}`,
  };
  console.log("Sending verification email to " + email);

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email verification");
  }
};

const sendEmail = async (req, res) => {
  let emailFromSendEmail;

  const email = req.body.email;

  try {
    console.log("issa", email);
    emailFromSendEmail = email;

    const checkEmailQuery = {
      text: "SELECT user_id , password FROM users WHERE email = $1",
      values: [email],
    };

    const emailCheck = await db.query(checkEmailQuery);

    if (emailCheck.rows.length > 0) {
      console.log("object");
      await sendVerificationEmail(email, generatedVerificationCode);
      console.log("ccccccccc", email);
      res.json("Verification code email has been sent.");
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    } else {
      res.status(400).json({ error: "Email not found in the database." });
    }
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.json({
      error: "An error occurred while sending the verification email.",
    });
  }
};

const verificationCode = async (req, res) => {
  const verificationCode = req.body.verificationCode.join("");
  console.log(verificationCode);

  if (verificationCode === generatedVerificationCode) {
    res.json({
      message: "You can go to reset password",
    });
  } else {
    res.status(400).json({
      message: "Invalid verification code",
    });
  }
};

module.exports = {
  newUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
  decode,
  google,
  getUserProfile,
  logout,
  loginAdmin,
  updatePassword,
  updatePasswordmailer,
  validateEmail,
  getAllUsers,
  updatedImage,
  sendEmail,
  verificationCode,
  Undo,
};
