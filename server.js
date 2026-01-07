const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan")
const methodOverride = require("method-override");
const carRoutes = require("./controller/car.route")

require("dotenv").config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();
app.use(express.static('public'));
app.use(methodOverride("_method")); // Use the query parameter '_method'
app.use(morgan("dev"));

// Middleware to parse URL-encoded form data from POST requests.
app.use(express.urlencoded({ extended: false }));

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("✅ MongoDB connection successful");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};
connectToDB();

app.use("/cars", carRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
