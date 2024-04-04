const clc = require("cli-color");
const userValidation = require("../Utils/UserValidation");

const signupController = async (req, res) => {
  const { name, email, username, password } = req.body;
  try {
    await userValidation({ name, email, username, password });
    return res.send("Register user");
  } catch (error) {
    return res.send({
      status: 400,
      message: error,
    });
  }
};

module.exports = signupController;
