const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Conversation"
  },
  body: {
    type: String,
    required: true
  },
  messageDate: {
    type: Date,
    default: Date.now
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  },
});

module.exports = Message = mongoose.model("message", messageSchema);