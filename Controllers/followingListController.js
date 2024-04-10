const { followingUserList } = require("../Models/FollowModel");
const { ObjectId } = require("mongodb");
const followingListController = async (req, res) => {
  const SKIP = Number(req.query.skip) || 0;
  const userId = req.body.userId;
  const followerUserId = userId
    ? new ObjectId(userId)
    : req.session.user.userId;
  console.log(req.session.user.userId);
  console.log(followerUserId);
  try {
    const followDb = await followingUserList({ followerUserId, SKIP });
    if (!followDb)
      return res.send({
        status: 200,
        message: "User doesnot follow any one",
        data: followDb,
      });
    return res.send({
      status: 200,
      message: "Read success",
      data: followDb,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      message: "Internal server error",
      data: error,
    });
  }
};

module.exports = followingListController;
