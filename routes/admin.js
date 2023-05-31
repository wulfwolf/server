require("dotenv").config();
const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

//@route POST admin/auth/register
//@desc Register admin
//@access Public
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "missing email / password !" });
  }
  try {
    //check for existing user
    const user = await Admin.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ success: false, message: "email already taken" });
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new Admin({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    // return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({
      success: true,
      message: "User created successfully !",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

//@route POST admin/auth/login
//@desc login admin
//@access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "missing email / password!" });
  }
  try {
    const user = await Admin.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "incorrect email/password" });
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "incorrect email/password" });

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
