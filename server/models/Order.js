const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  title: String,
  price: Number,
  qty: Number,
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  total: Number,
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
