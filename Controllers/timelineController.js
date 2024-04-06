const { getAllBlogs } = require("../Models/BlogModel");

const timelineController = async (req, res) => {
  const SKIP = Number(req.query.skip) || 0;
  try {
    const blogDb = await getAllBlogs({ SKIP });
    if (blogDb.length === 0)
      return res.send({
        status: 202,
        message: "No More Blogs Found",
      });
    return res.send({
      status: 200,
      message: "All Blog read success",
      data: blogDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
};

module.exports = timelineController;
