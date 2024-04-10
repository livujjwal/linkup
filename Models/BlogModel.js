const { isValidObjectId } = require("mongoose");
const { LIMIT } = require("../PrivateConstants");
const BlogSchema = require("../Schema/BlogSchema");
const { followingUserList } = require("./FollowModel");

const createBlog = ({ title, bodyText, userId, creationDateTime }) => {
  return new Promise(async (resolve, reject) => {
    const blogObj = new BlogSchema({
      title,
      bodyText,
      userId,
      creationDateTime,
    });
    try {
      const blogDb = await blogObj.save();
      resolve(blogDb);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllBlogs = ({ followerUserId, SKIP }) => {
  return new Promise(async (resolve, reject) => {
    //pagination,sort
    try {
      const followingUsers = await followingUserList({
        followerUserId,
        SKIP,
      });
      const followingUserIds = followingUsers.map(({ _id }) => _id);
      // console.log(followingUserIds);
      followingUserIds.push(followerUserId);
      const blogDb = await BlogSchema.aggregate([
        {
          $match: {
            userId: { $in: followingUserIds },
            isDeleted: { $ne: true },
          },
        },
        //sort based on time
        {
          $sort: { creationDateTime: -1 },
        },
        //pagination
        {
          $facet: {
            data: [{ $skip: SKIP }, { $limit: LIMIT }],
          },
        },
      ]);

      resolve(blogDb[0].data);
    } catch (error) {
      reject(error);
    }
  });
};
const getMyBlogs = ({ SKIP, userId }) => {
  return new Promise(async (resolve, reject) => {
    //match pagination sort
    try {
      const blogDb = await BlogSchema.aggregate([
        //match
        {
          $match: { userId: userId, isDeleted: false },
        },
        //sort based on time
        {
          $sort: { creationDateTime: -1 },
        },
        //pagination
        {
          $facet: {
            data: [{ $skip: SKIP }, { $limit: LIMIT }],
          },
        },
      ]);
      resolve(blogDb[0].data);
    } catch (error) {
      reject(error);
    }
  });
};
const getBlogWithId = ({ blogId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!isValidObjectId(blogId)) reject("Invalid blogId formate from user");
      const blogDb = await BlogSchema.findOne({ _id: blogId });
      if (!blogDb) reject("No blog found with blogId : " + blogId);
      resolve(blogDb);
    } catch (error) {
      reject(error);
    }
  });
};
const editBlog = ({ title, bodyText, blogId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const prevblogDb = await BlogSchema.findOneAndUpdate(
        { _id: blogId },
        { title, bodyText }
      );
      resolve(prevblogDb);
    } catch (error) {
      reject(error);
    }
  });
};
const deleteBlog = ({ blogId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const prevblogDb = await BlogSchema.findOneAndDelete({ _id: blogId });
      const prevblogDb = await BlogSchema.findOneAndUpdate(
        { _id: blogId },
        {
          isDeleted: true,
          deletionDateTime: Date.now(),
        }
      );
      resolve(prevblogDb);
    } catch (error) {
      reject(error);
    }
    // console.log(blogId);
    // resolve();
  });
};
module.exports = {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  getBlogWithId,
  editBlog,
  deleteBlog,
};
