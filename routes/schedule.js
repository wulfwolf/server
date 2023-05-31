require("dotenv").config();
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Schedule = require("../models/Schedule");
const axios = require("axios");
//@route POST api/schedule/
//@desc user create schedule
//@access Private
router.post("/:id", verifyToken, async (req, res) => {
  const { date, meal } = req.body;
  try {
    const findCondition = {
      $and: [
        {
          date,
        },
        {
          meal,
        },
      ],
    };
    const findSchedule = await Schedule.findOne(findCondition);
    if (findSchedule) {
      return res.status(409).json({
        success: true,
        message: "you already set up for this schedule!",
      });
    }
    const schedule = new Schedule({
      date,
      meal,
      user: req.userId,
      recipe: req.params.id,
    });
    await schedule.save();
    await axios.post(`http://localhost:5000/api/notification/`, {
      title: `Bạn vừa lên lịch trình cho món ăn`,
      desc: `${schedule.recipe} - ${schedule.meal} - ${schedule.date} `,
      content: `Bạn sẽ nhận được lời nhắc vào ngày ${date}`,
      receiver: "everyone",
    });
    res.status(200).json({ success: true, message: "Saved!", schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
//@route GET api/schedule/
//@desc user get all user's schedules
//@access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const schedules = await Schedule.find({ user: req.userId })
      .populate("recipe")
      .select(["recipe", "date", "meal", "Scheduled"]);

    res
      .status(200)
      .json({ success: true, message: "find success!", schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
module.exports = router;
