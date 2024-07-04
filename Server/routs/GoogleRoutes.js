// routes.js
const express = require("express");
const passport = require("../controlers/GoogleController");
const jwt = require("jsonwebtoken");
const router = express.Router();
const SECRET_KEY = 'issa';

// router.get("/", (req, res) => {
//   res.send("<button><a href='/auth'>Login With Google</a></button>");
// });

router.get(
  "/auth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/callback/success",
    failureRedirect: "/auth/callback/failure",
  })
);

router.get("/auth/callback/success", (req, res) => {
  if (!req.user) {
    res.redirect("/auth/callback/failure");
  }
  const userData = {
    google_id: req.user.id,
    username: req.user.displayName,
    role: "user",
    user_id: req.user.user_id
  };
  console.log("fsfsfsfsf", userData);

  // توليد التوكن باستخدام البيانات والمفتاح السري
  const token = jwt.sign(userData, SECRET_KEY, { expiresIn: "6h" });
  // res.send(`Welcome ${req.user.email}`);
  //   console.log(req.user,"sjksjsj")
  res.cookie("Token", token);
  res.redirect("http://localhost:3000");
});

router.get("/auth/callback/failure", (req, res) => {
  res.send("Error");
});

module.exports = router;
