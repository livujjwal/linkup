const userValidation = ({ name, email, username, password }) => {
  return new Promise((resolve, reject) => {
    console.log(name, email, username, password);
    if (!name || !email || !username || !password)
      reject("All fields are required");
    if (name.length < 4 || name.length > 50)
      reject("Name should be in 4-50 character");
    resolve();
  });
};

module.exports = userValidation;
