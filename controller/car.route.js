const router = require("express").Router();
const Car = require("../model/carModel");

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    console.log("✅ Fetched all cars:", cars);
    res.render("all-cars.ejs", { cars });
  } catch (error) {
    console.error("❌ Error fetching all cars:", error);
    res.send({ message: "Failed to fetch all cars" });
  }
};

const createCar = async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    console.log("✅ car added successfully:", newCar);
    res.redirect("/cars");
  } catch (error) {
    console.error("❌ Error adding new car:", error);
    res.send({ message: "Failed to add new cars" });
  }
};

const getCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Car.findById(id);
    console.log("Car details:", car);
    if (car === null) {
      return res.send("Car does not exist");
    }
    res.render("car.ejs", { car });
  } catch (error) {
    console.error("❌ Error fetching car:", error);
    res.send({ message: "Failed to fetch the car" });
  }
};

const getCarForEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Car.findById(id);
    console.log("Editing car: ", car);
    if (car === null) {
      return res.send("Car does not exist");
    }
    res.render("edit-car.ejs", { car });
  } catch (error) {
    console.error("❌ Error fetching car for edit:", error);
    res.send({ message: "Failed to fetch and edit the car" });
  }
};

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
    console.log("✅ Car updated successfully:", updatedCar);
    res.redirect(`/cars/${id}`);
  } catch (error) {
    console.error("❌ Error updating car:", error);
    res.send({ message: "Failed to update the car" });
  }
};

const deleteCar = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.send("Car does not exist");
    }
    const deletedCar = await Car.findByIdAndDelete(id);
    console.log("✅ Car deleted successfully:", deletedCar);
    res.redirect("/cars");
  } catch (error) {
    console.error("❌ Error deleting car:", error);
    res.send({ message: "Failed to delete the car" });
  }
};

router.get("/", getAllCars);

router.get("/new", (req, res) => {
  res.render("add-car.ejs");
});

router.post("/create", createCar);

router.get("/:id", getCarById);

router.get("/:id/edit", getCarForEdit);

router.put("/:id", updateCar);

router.delete("/:id", deleteCar);

module.exports = router;
