const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const uploadMultiImage = require("../utils/uploadFiles");
const multer = require("multer");

const {
  searchUsers,
  getContestsForUser,
  searchUserPayment,
  addCustomer,
  removeCustomer,
  updateUser,
} = require("../controllers/user");

router.route("/").get(protect, searchUsers);
router.route("/profile").get(protect, getContestsForUser);
router.route("/customer").get(protect, searchUserPayment);
router.route("/customer").post(protect, addCustomer);
router.route("/customer").delete(protect, removeCustomer);
router.route("/profile/update").post(protect, function (req, res, next) {
  uploadMultiImage(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.send(err);
      next();
    } else if (err) {
      res.send(err);
      next();
    }
    updateUser(req, res, next);
  });
});
module.exports = router;
