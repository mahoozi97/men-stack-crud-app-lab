const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;

const create = async (req, res) => {
  try {
    const newCar = await Car({ ...req.body });
    await newCar.save();
    res.status(200).send({
      message: "Travel posted successfully",
      car: newCar,
    });
  } catch (error) {
    console.error("Error creating new car:", error);
    res.status(500).send({ message: "Failed to create a new car" });
  }
};

const read = async (req,res) => {
  try {
    const cars = await Car.find()
    res.status(200).send(cars)
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).send({ message: "Failed to fetch all cars" });
  }
}
