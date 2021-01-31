const express = require("express");
const userCtrl = require("../controller/user-ctrl");
const authCtrl = require("../controller/auth-ctrl");

const router = express.Router();

// login request
router.post("/login", authCtrl.login);

// signup request
router.post("/signup", authCtrl.signup);

// query all the user info
router.route("/user").get(userCtrl.getAllUsersInfo);

router
  .route("/user/:id")
  .get(userCtrl.getUserInfo) // query specific user info
  .patch(userCtrl.updateUser); // update user info
// .delete(userCtrl.deleteUser); // delete user info

module.exports = router;
