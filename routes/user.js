require("dotenv").config();
const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../middleware/auth");
//@route POST api/auth/delete/:id
//@desc Delete user
//@access Public
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user)
      return res.status(200).json({ success: true, message: "user deleted" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
