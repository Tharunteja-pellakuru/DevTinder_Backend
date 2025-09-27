const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInId = req.user._id;
    const USER_DETAILS = "_id firstName lastName photoUrl skills";
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInId,
      status: "interested",
    }).populate("fromUserId", USER_DETAILS);
    const data = connectionRequest.map((request) => request.fromUserId);
    return res.json({
      message: "Data fetched successfully!",
      data,
    });
  } catch (err) {
    return res.status(500).json({ message: "ERROR: " + err.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInId = req.user._id;
    const USER_DETAILS = "_id firstName lastName photoUrl skills";
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInId, status: "accepted" },
        { toUserId: loggedInId, status: "accepted" },
      ],
    }).populate("fromUserId toUserId", USER_DETAILS);

    console.log(connections);
    const data = connections.map((user) => {
      if (user.fromUserId.toString() === loggedInId.toString()) {
        return user.toUserId;
      }
      return user.fromUserId;
    });
    res.json({ message: "Data fetched successfully!", data });
  } catch (err) {
    return res.status(500).json({ message: "ERROR: " + err.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInId = req.user._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInId }, { toUserId: loggedInId }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connections.forEach((connection) => {
      hideUsersFromFeed.add(connection.fromUserId.toString());
      hideUsersFromFeed.add(connection.toUserId.toString());
    });

    const users = await User.find({
      _id: { $nin: Array.from(hideUsersFromFeed) },
    })
      .select("_id firstName lastName photoUrl about age gender skills")
      .skip(skip)
      .limit(limit);

    res.json({ message: "Data fetched successfully!", data: users });
  } catch (err) {
    return res.status(400).json({ message: "ERROR: " + err.message });
  }
});

module.exports = userRouter;
