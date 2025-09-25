const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Product = require("./models/Product");
const Order = require("./models/Order");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Products
app.get("/api/products", async (req, res) => {
  const products = await Product.find().lean();
  res.json(products);
});

app.get("/api/products/:id", async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
});

// Orders
app.post("/api/orders", async (req, res) => {
  try {
    const { items, customer } = req.body;
    if (!items || items.length === 0)
      return res.status(400).json({ error: "No items" });
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    const order = new Order({ items, total, customer });
    await order.save();
    res.json({ success: true, orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
