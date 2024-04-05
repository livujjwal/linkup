const express = require("express");
const BlogRouter = express.Router();
const blogController = require("../Controllers/blogController");
const isAuth = require("../Middlewares/AuthMiddleware");

BlogRouter.get("/check", isAuth, blogController);

module.exports = BlogRouter;
