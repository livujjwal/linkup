const express = require("express");
const followController = require("../Controllers/followController");
const followingListController = require("../Controllers/followingListController");
const followerListController = require("../Controllers/followerListController");
const unfollowController = require("../Controllers/unfollowController");
const FollowRouter = express.Router();

FollowRouter.post("/follow_user", followController);
FollowRouter.post("/following_list", followingListController);
FollowRouter.post("/follower_list", followerListController);
FollowRouter.post("/unfollow_user", unfollowController);

module.exports = FollowRouter;
