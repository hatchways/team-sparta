const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
  contest_id: { type: mongoose.Types.ObjectId, required: true, ref: "contest" },
  files: [{ type: String, required: true }],
  is_winner: { type: Boolean, default: false },
  date_created: { type: Date, default: Date.now },
});

module.exports = Submission = mongoose.model("Submission", submissionSchema);
