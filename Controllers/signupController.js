const clc = require("cli-color");
const userValidation = require("../Utils/UserValidation");

const signupController = async (req, res) => {
  console.log(req.body);
  const { name, email, username, password } = req.body;
  console.log(clc.blueBright(name, email, username, password));
  try {
    await userValidation({ name, email, username, password });
    return res.send("Register user");
  } catch (error) {
    console.log(error);
    return res.send({
      status: 400,
      message: error,
    });
  }
};

module.exports = signupController;
