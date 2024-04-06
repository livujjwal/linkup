const express = require("express");
const app = express();
const clc = require("cli-color");
const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);
require("dotenv").config();

const store = new mongoDbSession({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

//file import
const db = require("./db");
//router
const AuthRouter = require("./Routes/AuthRoutes");
const BlogRouter = require("./Routes/BlogRoutes");
const isAuth = require("./Middlewares/AuthMiddleware");
const FollowRouter = require("./Routes/FollowRoutes");
//middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
//routes
app.use("/auth", AuthRouter);
app.use("/blog", isAuth, BlogRouter);
app.use("/follow", isAuth, FollowRouter);

app.listen(process.env.PORT, () => {
  console.log(clc.yellowBright("Server is running at PORT : "));
  console.log(clc.yellowBright.bold.underline("http://localhost:8000/"));
});
