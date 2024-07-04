const express = require("express");
const router = express.Router();
const UserController = require("../controlers/UserControler");
const authentication = require("../middlewares/authMiddleware");
const uploadImg = require("../middlewares/MulterMiddlewares");

//register/login
router.post("/register", UserController.newUser);
router.post("/login", UserController.loginUser);
router.post("/logout", authentication.authenticateToken, UserController.logout);
router.post("/loginAdmin", UserController.loginAdmin);
router.post("/google", UserController.google);

//nodemiller
router.post("/sendEmail", UserController.sendEmail);
router.post("/verificationCode", UserController.verificationCode);

//token decoding
router.post("/decode", UserController.decode);

//users/user:id
router.get("/users/:page/:limit", UserController.getUsers);

router.get("/users", UserController.getAllUsers);
router.get("/user", authentication.authenticateToken, UserController.getUser);

router.get("/usernn/:user_id", UserController.getUserProfile);

//delete/update
router.put("/deleteuser/:id", UserController.deleteUser);

router.put(
  "/updateuser",
  authentication.authenticateToken,
  UserController.updateUser
);
router.put("/undo/:user_id", UserController.Undo);
router.put(
  "/updatepassword",
  authentication.authenticateToken,
  UserController.updatePassword
);
router.put("/updatepasswordmailer", UserController.updatePasswordmailer);
router.put(
  "/updatedImage",
  authentication.authenticateToken,
  uploadImg.uploadImg,
  UserController.updatedImage
);

module.exports = router;
