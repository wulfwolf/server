const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("admins", AdminSchema);
