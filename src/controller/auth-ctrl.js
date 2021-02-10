const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const process = require("process");
const crypto = require("crypto");

const User = require("../model/user-model");
const catchAsync = require("../util/async-catch");

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const expiresIn = parseInt(process.env.JWT_EXPIRES_IN);
  const cookieOptions = {
    expires: new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }

  res.cookie("jwt", token, cookieOptions);

  // Remove the password from the output
  user.password = undefined;

  return res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

const signup = catchAsync(async (req, res, _) => {
  console.log(req.body);
  const user = await User.create({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phoneNum: req.body.phoneNum,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    // passwordChangedAt: req.body.passwordChangedAt,
  });

  if (!user) {
    return new AppError("user created failed!", 400);
  }

  createAndSendToken(user, 201, res);
});

const login = catchAsync(async (req, res, next) => {
  console.log("login clicked!");
  const { email, password } = req.body;

  // Check if user exists and password is correct
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(new AppError("Incorrect Email or password!", 401));
  }

  createAndSendToken(user, 200, res);
});

const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = string(req.headers.authorization).split("Bearer");
  }

  console.log(`token is ${token}`);
  if (!token) {
    return next(new AppError("Login failed! Please log in to get method", 401));
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("User not found!", 401));
  }

  if (user.isChangedPasswordAfterSigning(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // Grant access to protected router
  req.user = user;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorized to access this action!", 401)
      );
    }
    next();
  };
};

module.exports.signup = signup;
module.exports.login = login;
module.exports.protect = protect;
module.exports.restrictTo = restrictTo;
