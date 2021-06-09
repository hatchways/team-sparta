const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversation_id: { type: mongoose.Types.ObjectId, required: true, ref: "Conversation" },
  body: { type: String, required: true },
  message_date: { type: Date, default: Date.now },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = Message = mongoose.model("message", messageSchema);
