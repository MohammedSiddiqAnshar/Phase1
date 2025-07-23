// server.js
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mycrudapp");

app.use("/api/users", userRoutes);

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
