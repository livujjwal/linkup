const { isValidObjectId } = require("mongoose");
const { LIMIT } = require("../PrivateConstants");
const BlogSchema = require("../Schema/BlogSchema");

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

const getAllBlogs = ({ SKIP }) => {
  return new Promise(async (resolve, reject) => {
    //pagination,sort
    try {
      const blogDb = await BlogSchema.aggregate([
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
          $match: { userId: userId },
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
      const prevblogDb = await BlogSchema.findOneAndDelete({ _id: blogId });
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
