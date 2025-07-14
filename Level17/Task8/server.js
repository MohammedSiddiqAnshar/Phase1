
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/products");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/productdb");

app.use("/api/products", productRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
