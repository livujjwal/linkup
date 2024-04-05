const loginValidation = require("../Utils/LoginValidation");
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
  const { loginId, password } = req.body;
  try {
    await loginValidation({ loginId, password });
  } catch (error) {
    return res.send({
      status: 400,
      message: error,
    });
  }
  try {
    const userDb = await User.isUserExist({ loginId });
    const isMatch = await bcrypt.compare(password, userDb.password);
    if (!isMatch)
      return res.send({
        status: 400,
        message: "Incorrect Password",
      });
    console.log(req.session);
    req.session.isAuth = true;
    req.session.user = {
      userId: userDb._id,
      email: userDb.email,
      username: userDb.username,
    };
    return res.send("login success");
  } catch (error) {
    return res.send({
      status: 400,
      message: error,
    });
  }
};
module.exports = loginController;
