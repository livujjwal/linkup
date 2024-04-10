const { followerUserList } = require("../Models/FollowModel");

const followerListController = async (req, res) => {
  const SKIP = req.query.skip || 0;
  const userId = req.body.userId;
  const followingUserId = userId ? userId : req.session.user.userId;
  try {
    const followDb = await followerUserList({ followingUserId, SKIP });
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
    return res.send({
      status: 500,
      message: "Internal server error",
      data: error,
    });
  }
};
module.exports = followerListController;
