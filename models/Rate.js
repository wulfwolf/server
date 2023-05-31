const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RateSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "recipes",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("rates", RateSchema);
