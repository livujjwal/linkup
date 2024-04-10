const { createBlog } = require("../Models/BlogModel");
const User = require("../Models/UserModel");
const blogValidation = require("../Utils/BlogValidation");

const createBlogController = async (req, res) => {
  const { title, bodyText } = req.body;
  const userId = req.session.user.userId;
  const creationDateTime = Date.now();
  try {
    await blogValidation({ title, bodyText });
  } catch (error) {
    return res.send({
      status: 400,
      message: error,
    });
  }
  try {
    await User.isUserIdExist(userId);
  } catch (error) {
    return res.send({
      status: 400,
      messsage: error,
    });
  }
  try {
    const blogDb = await createBlog({
      title,
      bodyText,
      userId,
      creationDateTime,
    });

    return res.send({
      status: 201,
      message: "New blog is created",
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

module.exports = createBlogController;
