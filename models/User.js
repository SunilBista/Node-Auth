const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password length shoould be greater than 6"],
  },
});

//fire a function after new data saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this?.password, salt);
  next();
});

//static method to login user
userSchema.statics.userLogin = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const authStatus = await bcrypt.compare(password, user.password);
    if (authStatus) {
      return user;
    }
    throw Error("password error");
  }
  throw Error("email error");
};
const User = mongoose.model("user", userSchema);

module.exports = User;
