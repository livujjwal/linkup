const logoutController = (req, res) => {
  console.log(req.session);
  req.session.destroy((err) => {
    if (err)
      res.send({
        status: 500,
        message: "Internal server error",
      });
    return res.send("logout successdully");
  });
};

module.exports = logoutController;
