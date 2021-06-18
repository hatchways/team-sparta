const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  messages: [{
    type: mongoose.Types.ObjectId,
    ref: "Message"
  }],
  participants: [{
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User"
  }],
  createdDate: {
    type: Date,
    default: Date.now
  },
  messageDate: {
    type: Date,
    default: Date.now
  },

});

module.exports = Conversation = mongoose.model("conversation", conversationSchema);