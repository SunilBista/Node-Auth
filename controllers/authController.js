const signup_get = (req, res) => {
  res.render("signup");
};

const login_get = (req, res) => {
  res.render("login");
};

const signup_post = (req, res) => {
  const { email, password } = req.body || {};
  console.log("Email", email);
  console.log("Password", password);
  res.send("New Signup");
};

const login_post = (req, res) => {
  const { email, password } = req.body || {};
  console.log("Email", email);
  console.log("Password", password);
  res.send("User Login");
};

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post,
};
