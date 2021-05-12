////// Dependencies //////
require("dotenv").config();
const { PORT = 3000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middleware
const cors = require("cors");
const morgan = require("morgan");

////// Database Connection /////
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection
  .on("open", () => console.log("You are connected to mongoose"))
  .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", () => console.log(error));

///// Models /////
const CheeseSchema = new mongoose.Schema({
  name: String,
  countryOfOrigin: String,
  image: String,
});
const Cheese = mongoose.model("Cheese", CheeseSchema);

///// Middleware /////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

////// Routes //////
app.get("/", (req, res) => {
  res.send("hello world");
});

// Cheese Index Route
app.get("/cheese", async (req, res) => {
  try {
    res.json(await Cheese.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Cheese Create Route
app.post("/cheese", async (req, res) => {
  try {
    res.json(await Cheese.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Cheese Update Route
app.put("/cheese/:id", async (req, res) => {
  try {
    res.json(await Cheese.findByIdAndUpdate(req.params.id, req.body), {
      new: true,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// Cheeese Delete Route
app.delete("/cheese/:id", async (req, res) => {
  try {
    res.json(await Cheese.findByIdAndRemove(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

////// Listner /////
app.listen(PORT, () => console.log(`listening on PORT ${{ PORT }}`));
