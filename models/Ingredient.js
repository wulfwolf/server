const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ingredient = new Schema(
  {
    foodName: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    expiredDate: {
      type: Number,
    },
    ScanCode: {
      type: String,
      require: true,
      unique: true,
    },
    unit: {
      type: String,
      enum: ["gr", "ml"],
    },
    kcalRate: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("ingredients", Ingredient);
