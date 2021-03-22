const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    require: [true, "Please provide an username!"],
    minlength: [2, "name can't be shorter than 2 characters!"],
    maxlength: [25, "name can't be longer than 25 characters!"],
    // validate: [validator.isAlphanumeric, "name must be English + number"],
  },

  password: {
    type: String,
    unique: true,
    trim: true,
    require: [true, "Please provide a password"],
    minlength: [4, "password can't be shorter than 4 characters'"],
    // validate: {
    //   validator: function (val) {
    //     const regex = /^[a-zA-Z0-9]*$/;
    //     return regex.test(val.trim());
    //   },
    //   message: "password must be English or Number or English + number",
    // },
  },

  name: {
    type: String,
    unique: true,
    trim: true,
    require: [true, "Please provide a name"],
    // validate: {
    //   validator: function (val) {
    //     const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
    //     return regex.test(val.trim());
    //   },
    //   message: "name must be English or Korean",
    // },
  },

  email: {
    type: String,
    unique: true,
    trim: true,
    require: [true, "Please provide an email"],
    // validate: [
    //   validator.isEmail,
    //   "provide a valid email address (e.g. blabla@gmail.com)",
    // ],
  },

  phoneNumber: {
    type: String,
    unique: true,
    trim: true,
    require: [true, "Please provide a phone number"],
    // validate: [validator.isPhone, "provide a valid phone number"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
