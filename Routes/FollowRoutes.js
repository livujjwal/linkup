const express = require("express");
const followController = require("../Controllers/followController");
const FollowRouter = express.Router();

FollowRouter.post("/follow_user", followController);

module.exports = FollowRouter;
