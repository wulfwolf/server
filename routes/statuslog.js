require("dotenv").config();
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const StatusLog = require("../models/StatusLog");

//@route POST api/statuslog/
//@desc store food
//@access Private
router.post("/", async (req, res) => {
  const { weight, height, user } = req.body;
  try {
    const status = new StatusLog({
      weight,
      height,
      user,
    });
    await status.save();
    res.status(200).json({ success: true, message: "updated!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
//@route get api/statuslog/
//@desc user get all status
//@access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    console.log(req.userId);

    const statuslog = await StatusLog.find({ user: req.userId });
    return res.json({ success: true, message: "Success", statuslog });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});
module.exports = router;
