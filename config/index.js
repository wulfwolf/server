const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://thinh1234:thinh1234@yummy.0iz0vpp.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("connect successfully");
  } catch (error) {
    console.log("can't connect");
  }
}
module.exports = { connect };
