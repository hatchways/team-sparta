const { Route53Resolver } = require("aws-sdk");
const express = require("express");
const router = express.Router();
const {
  getAllNotifications,
  getAllUnreadNotifications,
  createNewNotification,
  markNotificationAsRead,
} = require("../controllers/notifications");
const protect = require("../middleware/auth");

router.route("/:id").get(protect,getAllNotifications);

router.route("/unread/:id").get(protect,getAllUnreadNotifications);

router.route("/new").post(protect,createNewNotification);

router.route("/markread").patch(protect,markNotificationAsRead);

module.exports = router;
