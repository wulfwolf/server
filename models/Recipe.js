const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    recipeName: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
    },
    preparations: {
      type: Array,
    },
    img: {
      type: String,
    },
    calories: {
      type: Number,
    },
    instruction: {
      type: Array,
    },
    meal: {
      type: String,
      enum: ["Bữa sáng", "Bữa trưa", "Bữa tối", "Bữa xế", "Tráng miệng"],
      default: "Bữa sáng",
    },
    favorite: [{ type: Schema.Types.ObjectId, ref: "users" }],
    ingredients: [{ type: String }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("recipes", RecipeSchema);
