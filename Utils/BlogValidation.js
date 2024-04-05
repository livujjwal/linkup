const blogValidation = ({ title, bodyText }) => {
  return new Promise((resolve, reject) => {
    if (!title || !bodyText) reject("Missing blog data");
    if (typeof title !== "string") reject("Blog title is not a text");
    if (typeof bodyText !== "string") reject("Blog bodytext is not a text");
    resolve();
  });
};
module.exports = blogValidation;
