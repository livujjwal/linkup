const AccessSchema = require("../Schema/AccessSchema");

const rateLimiting = async (req, res, next) => {
  const sid = req.session.id;
  try {
    const accessDb = await AccessSchema.findOne({ sessionId: sid });
    if (!accessDb) {
      const accessObj = new AccessSchema({
        sessionId: sid,
        time: Date.now(),
      });
      await accessObj.save();
      next();
      return;
    }
    const timeDiff = Date.now() - accessDb.time;
    if (timeDiff < 500)
      return res.send({
        status: 400,
        message: "Too many request,please wait for some time",
      });
    await AccessSchema.findOneAndUpdate({
      sessionId: sid,
      time: Date.now(),
    });
    next();
  } catch (error) {
    return res.send({
      status: 500,
      meassage: "Internal server error",
      error: error,
    });
  }
};
module.exports = rateLimiting;
