const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MyFoodSchema = new Schema(
  {
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "recipes",
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("myFoods", MyFoodSchema);
