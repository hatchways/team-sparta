const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers, getContestsForUser } = require("../controllers/user");

router.route("/").get(protect, searchUsers);
router.route("/profile").get(protect, getContestsForUser);

module.exports = router;
