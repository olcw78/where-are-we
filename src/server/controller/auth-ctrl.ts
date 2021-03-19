// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
// const { promisify } = require("util");
import { promisify } from "util";
// const process = require("process");
import process from "process";
// const crypto = require("crypto");
import crypto from "crypto";

// const User = require("../model/user-model");
import { User } from "../model/user-model";
// const catchAsync = require("../util/async-catch");
import { AsyncCatch } from "../util/async-catch";

import AppError from "../util/app-error";

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  });
};

const createAndSendToken = (user: any, statusCode: number, res: any) => {
  const token = signToken(user._id);

  const expiresIn = parseInt(process.env.JWT_EXPIRES_IN!);
  const cookieOptions = {
    expires: new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000),
    // httpOnly: true,
  };

  // if (process.env.NODE_ENV === "production") {
  //   cookieOptions.secure = true;
  // }

  // res.cookie("jwt", token, cookieOptions);

  // Remove the password from the output
  user.password = undefined;

  return res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

export const signup = AsyncCatch(async (req: any, res: any, _: any) => {
  const user = await User.create({
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    phoneNum: req.body.phonenum,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    // passwordChangedAt: req.body.passwordChangedAt,
  });

  if (!user) {
    return new AppError("user created failed!", 400);
  }

  createAndSendToken(user, 201, res);
});

export const login = AsyncCatch(async (req: any, res: any, next: any) => {
  console.log("log in!", req.body);
  const { id, email, pw: password } = req.body;

  // Check if user exists and password is correct
  let isGoodtoGo = (id ?? email) !== "";
  isGoodtoGo = password !== "";

  if (!isGoodtoGo) {
    return next(
      new AppError("Please provide (email or id) and password!", 400)
    );
  }

  // Check if user exists and password is correct
  let user: any = await User.findOne({ email })?.select("+password");
  if (!user) {
    user = await User.findOne({ id })?.select("+password");
  }

  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(new AppError("Incorrect Email or password!", 401));
  }

  createAndSendToken(user, 200, res);
});

export const protect = AsyncCatch(async (req: any, res: any, next: any) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = (req.headers.authorization as string).split("Bearer")[1];
  }

  console.log(`token is ${token}`);
  if (!token) {
    return next(new AppError("Login failed! Please log in to get method", 401));
  }

  // Verify token
  const decoded: any = await promisify<string, jwt.Secret>(jwt.verify)(
    token,
    process.env.JWT_SECRET!
  );

  // check if user still exists
  const user: any = await User.findById(decoded.id);
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

export const restrictTo = (...roles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorized to access this action!", 401)
      );
    }
    next();
  };
};

// module.exports.signup = signup;
// module.exports.login = login;
// module.exports.protect = protect;
// module.exports.restrictTo = restrictTo;
