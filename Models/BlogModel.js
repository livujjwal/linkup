const BlogSchema = require("../Schema/BlogSchema");

const createBlog = ({ title, bodyText, userId }) => {
  return new Promise(async (resolve, reject) => {
    const blogObj = new BlogSchema({
      title,
      bodyText,
      userId,
    });
    try {
      const blogDb = await blogObj.save();
      resolve(blogDb);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = createBlog;
