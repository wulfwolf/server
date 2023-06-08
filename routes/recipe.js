require("dotenv").config();
const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const verifyToken = require("../middleware/auth");
const axios = require("axios");
//@route POST api/recipe/create
//@desc create repice
//@access Public
router.post("/create", async (req, res) => {
  const {
    recipeName,
    desc,
    instruction,
    meal,
    favorite,
    img,
    preparations,
    warningTags,
  } = req.body;

  if (!recipeName) {
    return res
      .status(400)
      .json({ success: false, message: "Recipe is required" });
  }
  try {
    const recipe = new Recipe({
      recipeName,
      desc,
      preparations,
      instruction,
      meal,
      favorite,
      img,
      warningTags,
    });

    await axios.post(`https://yummy-xe9c.onrender.com/api/notification/`, {
      title: "Hệ thống vừa cập nhật công thức mới",
      desc: recipeName,
      content: ` Hãy cùng khám phá món ăn mới nhé`,
      receiver: "everyone",
    });

    await recipe.save();
    res
      .status(200)
      .json({ success: true, message: "recipe created !", recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});

//@route GET api/recipe/
//@desc get repices
//@access Public
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("preparations.ingredient");

    return res.json({ success: true, message: "Success", recipes });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});

//@route GET api/recipe/:id
//@desc search/get a repice
//@access Public
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id }).populate(
      "preparations.ingredient"
    );
    return res.json({ success: true, message: "Success", recipe });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});
// @route post api/recipe/options/
// @desc get repice with options
// @access private
router.post("/options/", verifyToken, async (req, res) => {
  const { meal, ingredient } = req.body;
  try {
    if (!meal) {
      const RecipeWithOpts = await Recipe.find({
        preparations: {
          $elemMatch: { ingredient: ingredient },
        },
      }).populate("preparations.ingredient");
      return res.json({ success: true, message: "Success", RecipeWithOpts });
    }
    if (!ingredient) {
      const RecipeWithOpts = await Recipe.find({
        meal,
      });
      return res.json({ success: true, message: "Success", RecipeWithOpts });
    }
    const RecipeWithOpts = await Recipe.find({
      $and: [
        {
          meal,
        },
        {
          preparations: {
            $elemMatch: { ingredient: ingredient },
          },
        },
      ],
    }).populate("preparations.ingredient");
    return res.json({ success: true, message: "Success", RecipeWithOpts });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});
//@route PUT api/recipe/:id
//@desc edit recipe
//@access Public
router.put("/:id", verifyToken, async (req, res) => {
  const {
    recipeName,
    desc,
    img,
    instruction,
    meal,
    preparations,
    warningTags,
  } = req.body;
  try {
    console.log(req.params.id);

    const newRecipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id },
      {
        recipeName,
        desc,
        img,
        instruction,
        meal,
        preparations,
        warningTags,
      }
    );
    if (newRecipe) {
      res
        .status(200)
        .json({ success: true, message: "recipe updated !", newRecipe });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
module.exports = router;
