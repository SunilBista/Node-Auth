const express = require("express");
const router = express.Router(); //new instance of router object - small router
const authController = require("../controllers/authController");

const { signup_get, login_get, signup_post, login_post, logout_get } =
  authController;

router.get("/signup", signup_get);
router.post("/signup", signup_post);
router.get("/login", login_get);
router.post("/login", login_post);
router.get("/logout", logout_get);

module.exports = router;
