const { LIMIT } = require("../PrivateConstants");
const FollowSchema = require("../Schema/FollowSchema");
const User = require("./UserModel");

const followUser = ({ followerUserId, followingUserId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followExit = await FollowSchema.findOne({
        followerUserId,
        followingUserId,
      });
      if (followExit) return reject("Already following the user");
      const followObj = new FollowSchema({
        followerUserId,
        followingUserId,
        creationDateTime: Date.now(),
      });
      const followDb = await followObj.save();
      resolve(followDb);
    } catch (error) {
      reject(error);
    }
  });
};
const followingUserList = ({ followerUserId, SKIP }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followDb = await FollowSchema.aggregate([
        { $match: { followerUserId } },
        {
          $sort: { creationDateTime: -1 },
        },
        {
          $facet: {
            data: [{ $skip: SKIP }, { $limit: LIMIT }],
          },
        },
      ]);
      // resolve(followDb[0].data);
      const followingList = followDb[0].data.map(
        ({ followingUserId }) => followingUserId
      );
      const followingUserList = await User.getUserDetailsList(followingList);

      resolve(followingUserList.reverse());
    } catch (error) {
      reject(error);
    }
  });
};
const followerUserList = ({ followingUserId, SKIP }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followDb = await FollowSchema.aggregate([
        { $match: { followingUserId } },
        {
          $sort: { creationDateTime: -1 },
        },
        {
          $facet: {
            data: [{ $skip: SKIP }, { $limit: LIMIT }],
          },
        },
      ]);
      const followerUserIds = followDb[0].data.map(
        ({ followerUserId }) => followerUserId
      );
      const followerUserList = await User.getUserDetailsList(followerUserIds);
      resolve(followerUserList.reverse());
    } catch (error) {
      reject(error);
    }
  });
};
const unfollowUser = ({ followerUserId, followingUserId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const followDb = await FollowSchema.findOneAndDelete({
        followerUserId,
        followingUserId,
      });
      resolve(followDb);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  followUser,
  followingUserList,
  followerUserList,
  unfollowUser,
};
