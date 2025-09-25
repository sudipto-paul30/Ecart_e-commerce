const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

const products = [
  { title: "Sofa", price: 1599, image: "/images/p1.png", category: "sofa" },
  { title: "Chair", price: 999, image: "/images/p2.png", category: "chair" },
  { title: "Sofa", price: 1899, image: "/images/p3.png", category: "sofa" },
  { title: "Chair", price: 1199, image: "/images/p4.png", category: "chair" },
  { title: "Chair", price: 799, image: "/images/p5.png", category: "chair" },
  { title: "Sofa", price: 1699, image: "/images/p6.png", category: "sofa" },
  { title: "Chair", price: 1099, image: "/images/p7.png", category: "chair" },
  { title: "Chair", price: 1199, image: "/images/p8.png", category: "chair" },
  { title: "Sofa", price: 1499, image: "/images/p9.png", category: "sofa" },
  {
    title: "Show Rack",
    price: 1599,
    image: "/images/p10.png",
    category: "rack",
  },
  {
    title: "Round Sofa",
    price: 1399,
    image: "/images/p11.png",
    category: "sofa",
  },
  { title: "Chair", price: 1099, image: "/images/p12.png", category: "chair" },
];

async function seed() {
  await mongoose.connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce"
  );
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Database seeded");
  mongoose.disconnect();
}

seed();
