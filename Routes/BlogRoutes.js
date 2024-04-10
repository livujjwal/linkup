const express = require("express");
const BlogRouter = express.Router();
const createBlogController = require("../Controllers/createBlogController");
const timelineController = require("../Controllers/timelineController");
const myBlogsController = require("../Controllers/myBlogsController");
const editBlogController = require("../Controllers/editBlogController");
const deleteBlogController = require("../Controllers/deleteBlogController");
const rateLimiting = require("../Middlewares/RateLimiting");

BlogRouter.post("/create_blog", rateLimiting, createBlogController);
BlogRouter.get("/timeline", timelineController);
BlogRouter.get("/my_blogs", myBlogsController);
BlogRouter.post("/edit_blog", editBlogController);
BlogRouter.post("/delete_blog", deleteBlogController);

module.exports = BlogRouter;
