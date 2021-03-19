// const mongoose = require("mongoose");
import mongoose from "mongoose";
// const validator = require("validator");
import validator from "validator";
// const bcrypt = require("bcryptjs");
import bcrypt from "bcryptjs";

const userSchema: mongoose.Schema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      trim: true,
      require: [true, "Please provide an id!"],
      minlength: [2, "id can't be shorter than 2 characters!"],
      maxlength: [25, "id can't be longer than 25 characters!"],
      validate: [validator.isAlphanumeric, "id must be English + number"],
    },

    username: {
      type: String,
      trim: true,
      require: [true, "Please provide a username"],
      validate: {
        validator: function (val: any) {
          const regex = /[ㄱ-ㅎ|가-힣|a-z|A-Z|]+/;
          return regex.test(val.trim());
        },
        message: "username must be English or Korean",
      },
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
      validate: {
        validator: function (val: any) {
          const regex = /[\w\d.]+@[\w\d.]+(com|kr|ch|net|.)/;
          return regex.test(val.trim());
        },
        message: "provide a valid email address (e.g. blabla@gmail.com)",
      },
    },

    phoneNum: {
      type: String,
      unique: true,
      trim: true,
      require: [true, "Please provide a phone number"],
      validate: [validator.isNumeric, "provide a valid phone number"],
    },

    password: {
      type: String,
      trim: true,
      require: [true, "Please provide a password"],
      minlength: [4, "password can't be shorter than 4 characters'"],
      validate: {
        validator: function (val: any) {
          const regex = /[\w\d!@#$%^&*]+/;
          return regex.test(val.trim());
        },
        message: "password must be English or Number or English + number",
      },
      select: false,
    },

    passwordConfirm: {
      type: String,
      trim: true,
      require: [true, "Please provide a password confirmation"],
      validate: {
        validator: function (this: any, val: any) {
          return this.password === val;
        },
        message: "passwordConfirm is not equal to password!",
      },
      select: false,
    },

    passwordChangedAt: Date,

    passwordResetToken: String,

    passwordResetExpiresAt: Date,

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    active: {
      type: Boolean,
      select: false,
    },
  },
  {
    versionKey: "",
  }
);

userSchema.pre(
  "save",
  async function makePasswordIntoHash(this: any, next: any) {
    // only run this if password was actually modified somehow!
    if (!this.isModified("password")) {
      return next();
    }

    // make password into the hash with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    // Delete password confirmation
    this.passwordConfirm = undefined;

    next();
  }
);

userSchema.pre(
  "save",
  async function processPasswordChangedAt(this: any, next: any) {
    // only run this if password was actually modified somehow!
    if (!this.isModified("password") || this.isNew) {
      return next();
    }

    // ths token is always created after changing the password!
    this.passwordChangedAt = Date.now() - 1000;

    next();
  }
);

userSchema.methods.isCorrectPassword = async function isCorrectPassword(
  this: any,
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword ?? this.password);
};

userSchema.methods.isChangedPasswordAfterSigning = function isChangedPasswordAfterSigning(
  this: any,
  JWTtimestamp: number
) {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
    return changedTimestamp > JWTtimestamp;
  }

  this.passwordChangedAt = undefined;
  return false;
};

export const User = mongoose.model("User", userSchema);

// module.exports.userSchema = userSchema;
// module.exports = User;
