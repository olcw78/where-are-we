const mongoose = require("mongoose");
const User = require("../model/user-model");
const AppError = require("../util/app-error");
const catchAsync = require("../util/async-catch");

// const login = catchAsync();

const getAllUsersInfo = catchAsync(async (req, res) => {
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

const getUserInfo = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("No user exists", 404));
  }

  return res.status(200).json({
    status: "success",
    data: { user },
  });
};

const createUser = async (req, res, next) => {
  const user = await User.create(req.body);
  if (!user) {
    return next(new AppError("User Creation failed", 404));
  }

  return res.status(200).json({
    status: "success",
    data: { user },
  });
};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports.getAllUsersInfo = getAllUsersInfo;
module.exports.getUserInfo = getUserInfo;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
