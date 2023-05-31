const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "recipes",
      require: true,
    },
    date: {
      type: String,
    },
    meal: {
      type: String,
      enum: ["Bữa sáng", "Bữa trưa", "Bữa tối", "Bữa xế", "Tráng miệng"],
      default: "Bữa sáng",
    },
    Scheduled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("schedules", ScheduleSchema);
