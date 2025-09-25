const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  inStock: { type: Boolean, default: true },
});

module.exports = mongoose.model("Product", productSchema);
