const express = require("express");
const UserCtrl = require("../controller/user-ctrl");
const router = express.Router();

router.route("/login")
.post(); // login request

router.route("/signup")
.post(); // signup request

router.route("/:user").get(UserCtrl.getAllUsersInfo); // query all the user info

router.route("/:id")
.get() // query specific user info

module.exports = router;
