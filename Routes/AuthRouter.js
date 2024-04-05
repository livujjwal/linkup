const express = require("express");
const AuthRouter = express.Router();
//controllers
const signupController = require("../Controllers/SignupController");
const loginController = require("../Controllers/loginController");

AuthRouter.get("/check");
AuthRouter.post("/signup", signupController);
AuthRouter.post('/login',loginController)

module.exports = AuthRouter;
