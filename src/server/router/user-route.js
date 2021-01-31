const express = require("express");
const UserCtrl = require("../controller/user-ctrl");



const router = express.Router();

// login request
router.route("/login").post();

// signup request
router.route("/signup").post(UserCtrl.createUser);

// query all the user info
router.route("/user").get(UserCtrl.getAllUsersInfo);

router
  .route("/user/:id")
  .get(UserCtrl.getUserInfo) // query specific user info
  .patch(UserCtrl.updateUser) // update user info
  .delete(UserCtrl.deleteUser); // delete user info

module.exports = router;
