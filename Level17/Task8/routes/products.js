
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  const { category, minPrice, maxPrice, sortBy, search } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  let query = Product.find(filter);

  if (search) query = Product.find({ $text: { $search: search } });

  if (sortBy) query = query.sort({ [sortBy]: 1 });

  const products = await query.exec();
  res.json(products);
});

router.get("/stats/category", async (req, res) => {
  const stats = await Product.aggregate([
    { $group: {
      _id: "$category",
      totalProducts: { $sum: 1 },
      avgPrice: { $avg: "$price" },
      maxPrice: { $max: "$price" },
      minPrice: { $min: "$price" }
    }},
    { $sort: { avgPrice: -1 } }
  ]);
  res.json(stats);
});

router.get("/complex", async (req, res) => {
  const products = await Product.find({
    stock: { $gt: 10 },
    price: { $lt: 500 },
    category: { $in: ["Clothing", "Home"] }
  });
  res.json(products);
});

router.get("/avg-price", async (req, res) => {
  const avg = await Product.aggregate([
    { $group: { _id: "$category", averagePrice: { $avg: "$price" } } },
    { $sort: { averagePrice: -1 } }
  ]);
  res.json(avg);
});

module.exports = router;
