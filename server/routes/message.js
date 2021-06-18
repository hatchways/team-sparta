const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createMessage,
  getAllMessages,
  updateMessage,
} = require("../controllers/message");
const { validateMessage } = require("../validate");

router.use(protect);

router.route("/").post(validateMessage, createMessage);
router.route("/messages/:conversationId/").get(getAllMessages);
router.route("/:id").patch(validateMessage, updateMessage);

module.exports = router;
