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

// modifying data before it's saved to the database.
carSchema.pre("save", function () {
  
  if (this.make) {
    this.make = this.make[0].toUpperCase() + this.make.slice(1);
  }

  if (this.model) {
    this.model = this.model[0].toUpperCase() + this.model.slice(1);
  }
});

carSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate()
  if (update.make) {
    update.make = update.make[0].toUpperCase() + update.make.slice(1);
  }

  if (update.model) {
    update.model = update.model[0].toUpperCase() + update.model.slice(1);
  }
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
