const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatusLogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    height: {
      type: Number,
      require: true,
    },
    weight: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("statuslogs", StatusLogSchema);
