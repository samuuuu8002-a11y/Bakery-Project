const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true
    },

    product: {
      type: String,
      required: true
    },

    notes: {
      type: String,
      default: ""
    },

    totalAmount: {
      type: Number,
      required: true
    },

    advance: {
      type: Number,
      default: 0
    },

    balance: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);