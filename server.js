const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const {
  getAllCars,
  createCar,
  getCarById,
  getCarForEdit,
  updateCar,
  deleteCar
} = require("./controller/carController");

require("dotenv").config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();
app.use(express.static('public'));
app.use(methodOverride("_method")); // Use the query parameter '_method'

// Middleware to parse URL-encoded form data from POST requests.
app.use(express.urlencoded({ extended: true }));

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("✅ MongoDB connection successful");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};
connectToDB();

app.get("/cars", getAllCars);

app.get("/cars/new", (req, res) => {
  res.render("add-car.ejs");
});

app.post("/cars", createCar);

app.get("/cars/:id", getCarById);

app.get("/cars/:id/edit", getCarForEdit);

app.put("/cars/:id", updateCar);

app.delete("/cars/:id", deleteCar);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
