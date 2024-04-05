const clc = require("cli-color");
const userValidation = require("../Utils/UserValidation");
const User = require("../Models/UserModel");

const signupController = async (req, res) => {
  const { name, email, username, password } = req.body;
  try {
    await userValidation({ name, email, username, password });
  } catch (error) {
    return res.send({
      status: 400,
      message: error,
    });
  }
  try {
    await User.isEmailAndUsernameExist(email, username);
  } catch (error) {
    return res.send({
      status: 400,
      massage: error,
    });
  }
  try {
    const userObj = new User({ name, email, username, password });
    const userDb = await userObj.signupUser();
    return res.send({
      status: 201,
      message: "Register user",
      data: userDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = signupController;
