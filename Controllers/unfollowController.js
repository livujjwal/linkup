const { unfollowUser } = require("../Models/FollowModel");

const unfollowController = async (req, res) => {
  const followingUserId = req.body.userId;
  const followerUserId = req.session.user.userId;
  console.log(followerUserId, followingUserId);
  try {
    const followDb = await unfollowUser({ followerUserId, followingUserId });
    return res.send({
      status: 200,
      message: "unfollow successfull",
      data: followDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server Error",
      error: error,
    });
  }
};
module.exports = unfollowController;
