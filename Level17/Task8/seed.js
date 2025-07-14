
const mongoose = require("mongoose");
const Product = require("./models/Product");

const sampleProducts = [
  { name: "Red T-Shirt", price: 25, category: "Clothing", stock: 50 },
  { name: "Blue Jeans", price: 50, category: "Clothing", stock: 30 },
  { name: "Coffee Mug", price: 10, category: "Home", stock: 100 },
  { name: "Laptop", price: 800, category: "Electronics", stock: 10 },
  { name: "Desk Chair", price: 150, category: "Furniture", stock: 15 },
];

async function seedDB() {
  await mongoose.connect("mongodb://localhost:27017/productdb");
  await Product.deleteMany();
  await Product.insertMany(sampleProducts);
  console.log("Database seeded!");
  mongoose.disconnect();
}

seedDB();
