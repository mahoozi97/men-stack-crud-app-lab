const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
require("dotenv").config();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const Car = require("./model/carModel");

const app = express();
app.use(express.static("public"));
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

app.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    console.log("✅ Fetched all cars:",cars);
    res.render("allCars.ejs", { cars });
  } catch (error) {
    console.error("❌ Error fetching all cars:", error);
    res.send({ message: "Failed to fetch all cars" });
  }
});

app.get("/cars/new", (req, res) => {
  res.render("addCar.ejs");
});

app.post("/cars", async (req, res) => {
  try {
    const make = req.body.make;
    const model = req.body.model;
    const year = req.body.year;
    console.log(make, model, year);
    if (!make || !model || !year) {
      return res.send("Please Enter all information of car");
    }
    const newCar = await Car.create({ make, model, year });
    console.log("✅ car added successfully:", newCar);
    res.redirect("/cars");
  } catch (error) {
    console.error("❌ Error adding new car:", error);
    res.send({ message: "Failed to add new cars" });
  }
});

app.get("/cars/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (!id) {
      return res.send("Car does not exist");
    }
    const car = await Car.findById(id);
    console.log("Car details:", car);
    res.render("car.ejs", { car });
  } catch (error) {
    console.error("❌ Error fetching car:", error);
    res.send({ message: "Failed to fetch the car" });
  }
});

app.get("/cars/:id/edit", async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Car.findById(id);
    console.log("Editing car: ", car);
    res.render("editCar.ejs", { car });
  } catch (error) {
    console.error("❌ Error fetching car for edit:", error);
    res.send({ message: "Failed to fetch and edit the car" });
  }
});

app.put("/cars/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const make = req.body.make;
    const model = req.body.model;
    const year = req.body.year;
    console.log(id, make, model, year);
    if (!make || !model || !year) {
      return res.send("Please enter all information of car");
    }
    // id, req.body {new: true} //shorter code.
    const updatedCar = await Car.findByIdAndUpdate(id, {
      make,
      model,
      year,
      new: true,
    });
    console.log("✅ Car updated successfully:", updatedCar);
    res.redirect("/cars");
  } catch (error) {
    console.error("❌ Error updating car:", error);
    res.send({ message: "Failed to update the car" });
  }
});

app.delete("/cars/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    if (!id) {
      return res.send("Car does not exist");
    }
    const deletedCar = await Car.findByIdAndDelete(id);
    console.log("✅ Car deleted successfully:",deletedCar);
    res.redirect("/cars")
  } catch (error) {
    console.error("❌ Error deleting car:", error);
    res.send({ message: "Failed to delete the car" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`);
});
