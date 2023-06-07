require("dotenv").config();
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const StoredFood = require("../models/StoredFood");

//@route POST api/Fridge/:id
//@desc store food
//@access Private
router.post("/:id", verifyToken, async (req, res) => {
  const { quantity } = req.body;
  try {
    const findFood = await StoredFood.findOneAndDelete({
      ingredient: req.params.id,
    });
    if (findFood) {
      const newStoredFood = new StoredFood({
        fridge: req.userId,
        ingredient: req.params.id,
        quantity: findFood.quantity + quantity,
      });
      await newStoredFood.save();
      res
        .status(200)
        .json({ success: true, message: "Stored!", newStoredFood });
    } else {
      const storedFood = new StoredFood({
        fridge: req.userId,
        ingredient: req.params.id,
        quantity,
      });
      await storedFood.save();
      res.status(200).json({ success: true, message: "Stored!", storedFood });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

//@route GET api/storedFood/
//@desc get food from fridge
//@access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const storedFood = await StoredFood.find({ fridge: req.userId }).populate(
      "ingredient",
      ["foodName", "img", "unit"]
    );

    return res.json({ success: true, message: "Success", storedFood });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});
//@route PUT api/storedFood/
//@desc edit food from fridge
//@access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { quantity } = req.body;
  try {
    const storedFood = await StoredFood.findOneAndUpdate(
      { ingredient: req.params.id },
      { quantity: quantity }
    );
    if (storedFood) {
      return res.json({ success: true, message: "updated" });
    } else {
      return res.json({ success: true, message: "food not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});
//@route DELETE api/storedFood/:id
//@desc delete food from fridge
//@access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const storedFood = await StoredFood.findOneAndDelete({
      ingredient: req.params.id,
    });
    if (storedFood) {
      const newStoredFood = await StoredFood.find().populate("ingredient");
      if (newStoredFood)
        return res.json({
          success: true,
          message: "food deleted",
          newStoredFood,
        });
    } else {
      return res.json({ success: true, message: "food not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});
module.exports = router;
