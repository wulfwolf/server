require("dotenv").config();
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Ingredient = require("../models/Ingredient");

//@route POST api/ingredient/
//@desc admin add ingredient
//@access Private
router.post("/", verifyToken, async (req, res) => {
  const { foodName, ScanCode, img, unit, kcalRate } = req.body;
  try {
    const ingredient = new Ingredient({
      foodName,
      ScanCode,
      img,
      unit,
      kcalRate,
    });
    await ingredient.save();
    res.status(200).json({ success: true, message: "Saved!", ingredient });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
//@route get api/ingredient/
//@desc admin get ingredients
//@access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const ingredient = await Ingredient.find();
    return res.json({ success: true, message: "Success", ingredient });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});
//@route get api/ingredient/
//@desc user get ingredient
//@access Private
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const ingredient = await Ingredient.findOne({
      ScanCode: req.params.id,
    }).select("foodName");
    if (!ingredient) {
      return res.json({ success: false, message: "Food not found" });
    }
    return res.json({ success: true, message: "Success", ingredient });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});
//@route PUT api/ingredient/:id
//@desc admin edit ingredient
//@access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { foodName, ScanCode, img, unit, kcalRate } = req.body;
  try {
    const newIngredient = await Ingredient.findOneAndUpdate(
      { _id: req.params.id },
      {
        foodName,
        ScanCode,
        img,
        unit,
        kcalRate,
      }
    );
    await newIngredient.save();
    res.status(200).json({ success: true, message: "updated!", newIngredient });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
module.exports = router;
