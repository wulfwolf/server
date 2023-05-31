const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FridgeSchema = new Schema(
  {
    Owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
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
module.exports = mongoose.model("fridges", FridgeSchema);
