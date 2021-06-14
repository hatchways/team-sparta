const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  read: { type: Boolean, default: false },
  recipient: [{type: mongoose.Types.ObjectId, ref:"User"}]
});

module.exports = Notification = mongoose.model(
  "Notification",
  notificationSchema
);
