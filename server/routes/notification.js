const { Route53Resolver } = require("aws-sdk");
const express = require("express");
const router = express.Router();
const {
  getAllNotifications,
  getAllUnreadNotifications,
  createNewNotification,
  markNotificationAsRead,
} = require("../controllers/notifications");
// works
router.route("/").get(getAllNotifications);
//works
router.route("/unread").get(getAllUnreadNotifications);
//works
router.route("/new").post(createNewNotification);
//works
router.route("/markread").patch(markNotificationAsRead);

module.exports = router;
