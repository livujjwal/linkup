const { followUser } = require("../Models/FollowModel");
const User = require("../Models/UserModel");
const followController = async (req, res) => {
  const followingUserId = req.body.followingUserId;
  const followerUserId = req.session.user.userId;
  console.log(followerUserId, followingUserId);

  try {
    await User.isUserIdExist(followerUserId);
  } catch (error) {
    return res.send({
      status: 400,
      message: "Follower User Deos not exist",
    });
  }
  try {
    await User.isUserIdExist(followingUserId);
  } catch (error) {
    return res.send({
      status: 400,
      message: "Following User Deos not exist",
    });
  }
  try {
    const followDb = await followUser({ followerUserId, followingUserId });
    return res.send({
      status: 200,
      message: "Follow user successfully done",
      data: followDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};
module.exports = followController;
