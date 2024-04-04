const emailRegex = (email) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};
const passwordRegex = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    password
  );
};
const userValidation = ({ name, email, username, password }) => {
  return new Promise((resolve, reject) => {
    if (!name || !email || !username || !password)
      reject("All fields are required");
    checkLength(name, "Name");
    checkLength(username, "Username");
    checkLength(password, "Password");
    function checkLength(entry, entryTitle) {
      console.log(entry, entryTitle);
      if (entry.length < 4 || entry.length > 50)
        reject(`${entryTitle} should be in 4-50 character`);
    }
    console.log(emailRegex(email));
    if (!emailRegex(email)) reject("Please enter valid email");
    // if (!passwordRegex(password)) reject("Please enter strong password");
    resolve();
  });
};

module.exports = userValidation;
