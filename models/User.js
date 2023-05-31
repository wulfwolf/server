const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    height: {
      type: Number,
      require: true,
    },
    weight: {
      type: Number,
      require: true,
    },
    favoriteFood: {
      type: Schema.Types.ObjectId,
      ref: "recipes",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("users", UserSchema);
