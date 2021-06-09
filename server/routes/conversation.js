const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createConversation,
  getAllConversation,
  getConversationById,
} = require("../controllers/conversation");

router.use(protect);

router.route("/").post(createConversation);
router.route("/conversations/:userId").get(getAllConversation);
router.route("/:id/:userId").get(getConversationById);


module.exports = router;
