const bcrypt = require("bcrypt");

//schema
const UserSchema = require("../Schema/UserSchema");

//class init
const User = class {
  name;
  email;
  username;
  password;
  constructor({ name, email, username, password }) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
  }
  signupUser() {
    return new Promise(async (resolve, reject) => {
      try {
        var hashedPassword = await bcrypt.hash(
          this.password,
          Number(process.env.SALT)
        );
      } catch (error) {
        reject(error);
      }
      const userObj = new UserSchema({
        name: this.name,
        email: this.email,
        username: this.username,
        password: hashedPassword,
      });
      try {
        const userDb = await userObj.save();
        resolve(userDb);
      } catch (error) {
        reject(error);
      }
    });
  }
  static isEmailAndUsernameExist(email, username) {
    return new Promise(async (resolve, reject) => {
      try {
        const isUserExist = await UserSchema.findOne({
          $or: [{ email }, { username }],
        });
        if (isUserExist && isUserExist.email === email)
          reject("Email address already register");
        if (isUserExist && isUserExist.username === username)
          reject("Username already register");
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  static isUserExist({ loginId }) {
    return new Promise(async (resolve, reject) => {
      try {
        const userDb = await UserSchema.findOne({
          $or: [{ email: loginId }, { username: loginId }],
        }).select("+password");
        if (!userDb) reject("User does not exist, please signup");
        resolve(userDb);
      } catch (error) {
        return resolve.send({
          status: 500,
          message: "Internal Server Error",
          error: error,
        });
      }
    });
  }
};

module.exports = User;
