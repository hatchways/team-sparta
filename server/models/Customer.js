const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customer_id: {
    type: String,
  },
  payment_id: {
    type: String,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  user_id: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = Customer = mongoose.model("customer", customerSchema);
