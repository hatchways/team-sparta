const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  end_date: { type: Date, required: true },
  start_date: { type: Date, default: Date.now },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
  images: [{ type: String }],
  submissions: [{ type: mongoose.Types.ObjectId, ref: "Submission" }],
});

module.exports = Contest = mongoose.model("contest", contestSchema);
