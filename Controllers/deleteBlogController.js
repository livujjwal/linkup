const { getBlogWithId, deleteBlog } = require("../Models/BlogModel");

const deleteBlogController = async (req, res) => {
  const { blogId } = req.body;
  const userId = req.session.user.userId;
  try {
    const blogDb = await getBlogWithId({ blogId });
    //user check
    if (!userId.equals(blogDb.userId))
      return res.send({
        status: 403,
        message: "Forbidden action for currrent user",
      });
    //delete blog
    const prevblogDb = await deleteBlog({ blogId });
    return res.send({
      status: 200,
      message: "Blog Deleted",
      data: prevblogDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};
module.exports = deleteBlogController;
