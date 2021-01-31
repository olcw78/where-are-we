const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      require: [true, "Please provide an username!"],
      minlength: [2, "name can't be shorter than 2 characters!"],
      maxlength: [25, "name can't be longer than 25 characters!"],
      validate: [validator.isAlphanumeric, "name must be English + number"],
    },

    name: {
      type: String,
      unique: true,
      trim: true,
      require: [true, "Please provide a name"],
      validate: {
        validator: function (val) {
          const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
          return regex.test(val.trim());
        },
        message: "name must be English or Korean",
      },
    },

    email: {
      type: String,
      unique: true,
      trim: true,
      require: [true, "Please provide an email"],
      validate: [
        validator.isEmail,
        "provide a valid email address (e.g. blabla@gmail.com)",
      ],
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
        validator: function (val) {
          const regex = /^[a-zA-Z0-9]*$/;
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
        validator: function (val) {
          return this.password === val;
        },
        message: "passwordConfirm is not equal to password!",
      },
      select: false,
    },

    passwordChangedAt: Date,

    passwordResetToken: String,

    passwordResetExpiresAt: Date,

    active: {
      type: Boolean,
      select: false,
    },
  },
  {
    versionKey: "",
  }
);

userSchema.pre("save", async function makePasswordIntoHash(next) {
  // only run this if password was actually modified somehow!
  if (!this.isModified("password")) {
    return next();
  }

  // make password into the hash with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete password confirmation
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre("save", async function processPasswordChangedAt(next) {
  // only run this if password was actually modified somehow!
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  // ths token is always created after changing the password!
  this.passwordChangedAt = Date.now() - 1000;

  next();
});

userSchema.methods.isCorrectPassword = async function isCorrectPassword(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword ?? this.password);
};

userSchema.methods.isChangedPasswordAfterSigning = function isChangedPasswordAfterSigning(
  JWTtimestamp
) {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
    return changedTimestamp > JWTtimestamp;
  }

  this.passwordChangedAt = undefined;
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports.userSchema = userSchema;
module.exports = User;
