const { editBlog, getBlogWithId } = require("../Models/BlogModel");
const blogValidation = require("../Utils/BlogValidation");

const editBlogController = async (req, res) => {
  const blogId = req.body.blogId;
  const { title, bodyText } = req.body.data;
  const userId = req.session.user.userId;
  //validate user blog data
  try {
    await blogValidation({ title, bodyText });
  } catch (error) {
    return res.send({
      status: 400,
      message: "Data Error",
      error: error,
    });
  }
  //check user with userId
  try {
    const blogDb = await getBlogWithId({ blogId });
    // console.log(userId.equals(blogDb.userId));
    if (!userId.equals(blogDb.userId))
      return res.send({
        status: 403,
        message: "Forbidden action for currrent user",
      });
    //time check
    const timeDiff = (Date.now() - blogDb.creationDateTime) / (1000 * 60);
    if (timeDiff > 30)
      return res.send({
        status: 400,
        message: "Not allow to edit the blog after 30 mins of creation",
      });
    //edit blog
    const prevblogDb = await editBlog({ title, bodyText, blogId });
    return res.send({
      status: 200,
      message: "Blog updated successfully",
      data: prevblogDb,
    });
    // console.log(timeDiff);
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = editBlogController;
