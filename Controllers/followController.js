const { follow } = require("../Models/FollowModel");

const followController = async (req, res) => {
  const { followingUserId } = req.body;
  const followerUserId = req.session.user.folloerUserId;
  try {
    follow({ followerUserId, followingUserId });
  } catch (error) {}
  return res.send("ok");
};
module.exports = followController;
