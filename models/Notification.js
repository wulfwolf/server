const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    content: {
      type: String,
    },
    receiver: {
      type: String,
      default: "everyone",
      require: true,
    },
    read: [{ type: String }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("notifications", NotificationSchema);
