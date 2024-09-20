const User = require("../models/User");
const jwt = require("jsonwebtoken");
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {
    email: "",
    password: "",
  };

  if (err.message === "email error") {
    errors.email = "The email doesn't exist.";
  }

  if (err.message === "password error") {
    errors.password = "The password is incorrect";
  }

  //duplicate error code
  if (err?.code === 11000) {
    errors.email = "Duplicate email";
    return errors;
  }

  if (err?.message.includes("user validation failed")) {
    Object.values(err?.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createWebToken = (id) => {
  return jwt.sign({ id }, "sunil bista secret", {
    expiresIn: maxAge,
  });
};

const signup_get = (req, res) => {
  res.render("signup");
};

const login_get = (req, res) => {
  res.render("login");
};

const signup_post = async (req, res) => {
  const { email, password } = req.body || {};
  try {
    const user = await User.create({
      email,
      password,
    });
    const token = createWebToken(user._id);
    res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post = async (req, res) => {
  const { email, password } = req.body || {};
  try {
    const user = await User.userLogin(email, password);
    const token = createWebToken(user._id);
    res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (e) {
    const errors = handleErrors(e);
    res.status(400).json({ errors });
  }
};

const logout_get = (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.redirect("/");
};
module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post,
  logout_get,
};
