const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secretKey = process.env.JWT_SECRET;

const checkAuth = (req, res, next) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, "sunil bista secret", (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, secretKey, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { checkAuth, checkUser };
