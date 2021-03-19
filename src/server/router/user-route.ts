// const express = require("express");
import express from "express";
// const userCtrl = require("../controller/user-ctrl");
import * as userCtrl from "../controller/user-ctrl";
// const authCtrl = require("../controller/auth-ctrl");
import * as authCtrl from "../controller/auth-ctrl";

export const router = express.Router();

// login request
router.post("/login", authCtrl.login);

// signup request
router.post("/signup", authCtrl.signup);

// query all the user info
router.route("/user").get(userCtrl.getAllUsersInfo);

router
  .route("/user/:id")
  .get(userCtrl.getUserInfo) // query specific user info
  .patch(userCtrl.updateUser) // update user info
  .delete(authCtrl.protect, authCtrl.restrictTo("admin"), userCtrl.deleteUser); // delete user info

// module.exports = router;
