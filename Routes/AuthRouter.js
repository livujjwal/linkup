const express = require("express");
const AuthRouter = express.Router();
//controller imports
const signupController = require("../Controllers/SignupController");

AuthRouter.get("/check");
AuthRouter.post("/signup", signupController);

module.exports = AuthRouter;
