const express = require("express");
const BlogRouter = express.Router();
const createBlogController = require("../Controllers/createBlogController");
const timelineController = require("../Controllers/timelineController");
const myBlogsController = require("../Controllers/myBlogsController");

BlogRouter.post("/create_blog", createBlogController);
BlogRouter.get("/timeline", timelineController);
BlogRouter.get("/my_blogs", myBlogsController);

module.exports = BlogRouter;
