require("dotenv").config();
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Notification = require("../models/Notification");
const axios = require("axios");

//@route POST api/notification/
//@desc create notification
//@access Private
router.post("/", async (req, res) => {
  const { title, desc, content, receiver } = req.body;
  try {
    //call onesignal api
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer YTdkZWM4YTItMWMwNi00ZTc1LWJhYzQtMGVmYzJiZTczYTYx`;

    const PushNoti = await axios.post(
      `https://onesignal.com/api/v1/notifications`,
      {
        app_id: "fcbc463d-62da-48e4-b6b1-829b13685585",
        headings: { en: title },
        subtitle: { en: desc },
        contents: { en: content },
        included_segments: ["Subscribed Users"],
        data: { key: "value" },
      }
    );
    if (PushNoti.status !== 200) {
      return res
        .status(400)
        .json({ success: true, message: "Notify was not sent!" });
    }
    const noti = new Notification({
      title,
      desc,
      content,
      receiver,
    });
    await noti.save();
    return res.status(200).json({ success: true, message: "Notify sent!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
});
//@route get api/notification/
//@desc user get notifications
//@access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const notis = await Notification.find();
    if (notis) return res.status(200).json({ success: true, notis });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});
//@route put api/notification/
//@desc user read notifications
//@access Private
router.put("/:NotiId", verifyToken, async (req, res) => {
  try {
    const noti = await Notification.findByIdAndUpdate(req.params.NotiId, {
      $push: { read: req.userId },
    });
    if (noti) {
      res.status(200).json({ success: true, message: "UserRead" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
});
module.exports = router;
