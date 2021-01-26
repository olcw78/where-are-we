const mongoose = require("mongoose");
const User = require("../model/user-model");
const AppError = require("../util/app-error");

class UserCtrl {
  static async getAllUsersInfo(req, res) {
    const users = await User.find();
    if (!users) {
      return next(new AppError("No users exists", 404));
    }

    return res.status(200).json({
      status: "success",
      amount: users.length,
      data: { users },
    });
  }

  static getUserInfo(req, res) {}

  static async createUser(req, res, next) {}

  static updateUser(req, res) {}

  static deleteUser(req, res) {}

  static login(req, res) {}
}

module.exports = UserCtrl;
