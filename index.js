const express = require("express");
const app = express();
const clc = require("cli-color");
require("dotenv").config();
//file import
const db = require("./db");
//router
const AuthRouter = require("./Routes/AuthRouter")
//middleware
app.use(express.json())
app.use("/auth",AuthRouter)

app.listen(process.env.PORT, () => {
  console.log(clc.yellowBright("Server is running at PORT : "));
  console.log(clc.yellowBright.bold.underline("http://localhost:8000/"));
});
