const { getMyBlogs } = require("../Models/BlogModel");

const myBlogsController = async (req, res) => {
  const SKIP = Number(req.query.skip) || 0;
  const userId = req.session.user.userId;
  console.log(userId, SKIP);
  try {
    const blogDb = await getMyBlogs({ SKIP, userId });
    if (blogDb.length === 0)
      return res.send({
        status: 202,
        message: "No More Blogs Found",
      });
    return res.send({
      status: 200,
      message: "Blog read is success",
      data: blogDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};
module.exports = myBlogsController;
