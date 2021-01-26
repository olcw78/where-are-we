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

const updateUser = async (req, res, next) => {
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
};

const deleteUser = async (req, res) => {
  const deleted = await User.findByIdAndRemove(req.params.id);
  if (!deleted) {
    return new AppError("User deletion failed", 404);
  }

  return res.status(200).json({
    status: "success",
    id: req.params.id,
  });
};

module.exports.getAllUsersInfo = getAllUsersInfo;
module.exports.getUserInfo = getUserInfo;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
