const emailRegex = (email) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};
// const passwordRegex = (password) => {
//   return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
//     password
//   );
// };
const userValidation = ({ name, email, username, password }) => {
  return new Promise((resolve, reject) => {
    if (!name || !email || !username || !password)
      reject("All fields are required");

    if (typeof name !== "string") reject("Name must be a String");
    if (typeof email !== "string") reject("Email must be a String");
    if (typeof username !== "string") reject("Username must be a String");
    if (typeof password !== "string") reject("Password must be a String");
    if (username.length < 4 || username.length > 50)
      reject(`Username should be in 4-50 character`);
    if (password.length < 4 || password.length > 50)
      reject(`Password should be in 4-50 character`);
   
    
    if (!emailRegex(email)) reject("Please enter valid email");
    // if (!passwordRegex(password)) reject("Please enter strong password");
    resolve();
  });
};

module.exports = userValidation;
