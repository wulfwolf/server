require("dotenv").config();
const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//@route POST api/auth/register
//@desc Register user
//@access Public
router.post("/register", async (req, res) => {
  const { userName, password, gender, height, weight } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ success: false, message: "missing username / password !" });
  }
  if (!gender) {
    return res
      .status(400)
      .json({ success: false, message: "please select your gender !" });
  }
  try {
    //check for existing user
    const checkUser = await User.findOne({ userName });
    if (checkUser) {
      return res
        .status(409)
        .json({ success: false, message: "username already taken" });
    }
    const hashedPassword = await argon2.hash(password);
    const user = new User({
      userName,
      password: hashedPassword,
      gender,
      height,
      weight,
    });
    await user.save();
    // return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "User created successfully !",
      accessToken,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

//@route POST api/auth/login
//@desc login user
//@access Public
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ success: false, message: "missing username / password!" });
  }
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "incorrect username/password" });
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "incorrect username/password" });

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      message: "User loggedin successfully !",
      accessToken,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

module.exports = router;
