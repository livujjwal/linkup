const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const FollowSchema = new Schema({
  followerUserId: {
    type: ObjectId,
    required: true,
    ref: "user",
  },
  followingUserId: {
    type: ObjectId,
    required: true,
    ref: "user",
  },
  creationDateTime: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("follow", FollowSchema);
