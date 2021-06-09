const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
  participants: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
  created_date: { type: Date, default: Date.now},
  message_date: { type: Date, default: Date.now},
  
});

module.exports = Conversation = mongoose.model("conversation", conversationSchema);