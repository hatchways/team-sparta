const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  contest_id: { type: mongoose.Types.ObjectId, required: true, ref: "Contest" },
  files: [{ type: String, required: true }],
  is_active: { type: Boolean, default: true },
  date_created: { type: Date, default: Date.now },
});

module.exports = Submission = mongoose.model("Submission", submissionSchema);
