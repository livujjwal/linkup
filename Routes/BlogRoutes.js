const express = require("express");
const BlogRouter = express.Router();
const readBlogController = require("../Controllers/readBlogController");
const createBlogController = require("../Controllers/createBlogController");

BlogRouter.get("/read_blog", readBlogController);
BlogRouter.post("/create_blog", createBlogController);

module.exports = BlogRouter;
