// const express = require("express");
import express from "express";
// const userCtrl = require("../controller/user-ctrl");
import * as userCtrl from "../controller/User-ctrl";
// const authCtrl = require("../controller/auth-ctrl");
import AuthCtrl from "../controller/Auth-ctrl";
import RouteSecurity from "./Route-security";
import ERestrictionRole from "./ERestrictionRole";

const authCtrl = new AuthCtrl();
export const router = express.Router();

// login request
router.post("/login", authCtrl.Login);

// signup request
router.post("/signup", authCtrl.Signup);

// query all the user info
router.route("/user").get(userCtrl.getAllUsersInfo);

router
  .route("/user/:id")
  .get(userCtrl.getUserInfo) // query specific user info
  .patch(userCtrl.updateUser) // update user info
  .delete(
    RouteSecurity.Protect,
    RouteSecurity.RestrictTo(ERestrictionRole.admin),
    userCtrl.deleteUser
  ); // delete user info

// module.exports = router;
