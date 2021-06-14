const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  searchUsers,
  getContestsForUser,
  searchUserPayment,
  addCustomer,
  removeCustomer,
} = require("../controllers/user");

router.route("/").get(protect, searchUsers);
router.route("/profile").get(protect, getContestsForUser);
router.route("/customer").get(protect, searchUserPayment);
router.route("/customer").post(protect, addCustomer);
router.route("/customer").delete(protect, removeCustomer);

module.exports = router;
