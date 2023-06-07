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
    img: {
      type: String,
    },
    preparations: [
      {
        ingredient: {
          type: Schema.Types.ObjectId,
          ref: "ingredients",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    instruction: {
      type: Array,
    },
    meal: {
      type: String,
      enum: ["Bữa sáng", "Bữa trưa", "Bữa tối", "Bữa xế", "Tráng miệng"],
      default: "Bữa sáng",
    },
    favorite: [{ type: Schema.Types.ObjectId, ref: "users" }],
    // ingredients: [{ type: String }],
    warningTags: [
      {
        type: String,
        enum: [
          "ALCOHOL",
          "FASTFOOD",
          "HEALTHY FOOD",
          "FATTY FOOD",
          "SPICY FOOD",
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("recipes", RecipeSchema);
