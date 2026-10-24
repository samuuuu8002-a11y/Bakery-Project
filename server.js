const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const Order = require("./models/Order");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// HOME
app.get("/", (req, res) => {
  res.send("Bakery Backend is Running");
});


// SAVE ORDER
app.post("/orders", async (req, res) => {
  try {

    const order = new Order(req.body);

    await order.save();

    res.status(201).json({
      message: "Order Saved Successfully",
      order: order
    });

  } catch (error) {

    res.status(500).json({
      message: "Error saving order",
      error: error.message
    });

  }
});


// GET ALL ORDERS
app.get("/orders", async (req, res) => {
  try {

    const orders = await Order.find().sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: "Error getting orders",
      error: error.message
    });

  }
});


// MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });