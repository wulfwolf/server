require("dotenv").config();
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const myFood = require("../models/MyFood");
const Recipe = require("../models/Recipe");

//@route POST api/myfood/
//@desc add/remove favorite food
//@access Private
router.post("/:id", verifyToken, async (req, res) => {
  try {
    const removeMyFood = await myFood.findOneAndDelete({
      user: req.userId,
      recipe: req.params.id,
    });
    const RMfavorite = await Recipe.findByIdAndUpdate(req.params.id, {
      $pull: { favorite: req.userId },
    });
    if (!removeMyFood) {
      const addMyFood = new myFood({
        recipe: req.params.id,
        user: req.userId,
      });
      const Updatefavorite = await Recipe.findByIdAndUpdate(req.params.id, {
        $push: { favorite: req.userId },
      });
      await addMyFood.save();
      res
        .status(200)
        .json({ success: true, message: "Added", myfavoritefood: addMyFood });
    } else {
      res.json({ success: true, message: "Removed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

//@route GET api/myfood/
//@desc get myFood
//@access Private
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const myfoods = await myFood
      .find({ user: req.params.id })
      .populate("recipe");

    return res.json({ success: true, message: "Success", myfoods });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});

module.exports = router;
