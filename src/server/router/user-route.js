const express = require("express");
const UserCtrl = require("../controller/user-ctrl");
const router = express.Router();

// login request
router.route("/login").post();

// signup request
router.route("/signup").post();

// query all the user info
router.route("/user").get(UserCtrl.getAllUsersInfo);

// query specific user info
router.route("/user/:id").get(UserCtrl.getUserInfo);

module.exports = router;
