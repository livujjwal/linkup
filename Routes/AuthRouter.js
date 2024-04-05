const express = require("express");
const AuthRouter = express.Router();
//controllers
const signupController = require("../Controllers/SignupController");
const loginController = require("../Controllers/loginController");
const isAuth = require("../Middlewares/AuthMiddleware");
const logoutController = require("../Controllers/logoutController");

AuthRouter.post("/signup", signupController);
AuthRouter.post("/login", loginController);
AuthRouter.post("/logout", isAuth, logoutController);

module.exports = AuthRouter;
