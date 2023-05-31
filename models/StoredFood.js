const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoredFoodSchema = new Schema(
  {
    fridge: {
      type: Schema.Types.ObjectId,
      ref: "fridges",
      require: true,
    },
    ingredient: {
      type: Schema.Types.ObjectId,
      ref: "ingredients",
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("storedfoods", StoredFoodSchema);
