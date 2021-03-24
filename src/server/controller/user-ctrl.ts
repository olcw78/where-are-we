// const mongoose = require("mongoose");
import mongoose from "mongoose";
// const User = require("../model/user-model");
import { User } from "../model/user-model";
// const AppError = require("../util/app-error");
import AppError from "../util/App-error";
// const catchAsync = require("../util/async-catch");
import { AsyncCatch } from "../util/async-catch";

// const login = catchAsync();

export const getAllUsersInfo = AsyncCatch(async (_: any, res: any, next: any) => {
  const users = await User.find();
  if (!users) {
    return next(new AppError("No users exist", 404));
  }

  return res.status(200).json({
    status: "success",
    amount: users.length,
    data: { users },
  });
});

export const getUserInfo = AsyncCatch(async (req: any, res: any, next: any) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user exists", 404));
  }

  return res.status(200).json({
    status: "success",
    data: { user },
  });
});

export const updateUser = AsyncCatch(async (req: any, res: any, next: any) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError("No user found with this id!", 404));
  }

  return res.status(200).json({
    status: "success",
    data: { user },
  });
});

export const deleteUser = AsyncCatch(async (req: any, res: any) => {
  const deleted = await User.findByIdAndRemove(req.params.id);
  if (!deleted) {
    return new AppError("User deletion failed", 404);
  }

  return res.status(200).json({
    status: "success",
    id: req.params.id,
  });
});

// module.exports.getAllUsersInfo = getAllUsersInfo;
// module.exports.getUserInfo = getUserInfo;
// module.exports.updateUser = updateUser;
// module.exports.deleteUser = deleteUser;
