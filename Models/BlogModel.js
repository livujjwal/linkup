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
module.exports = { createBlog, getAllBlogs, getMyBlogs };
