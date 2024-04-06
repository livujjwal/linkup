const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  bodyText: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 1000,
  },
  creationDateTime: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

module.exports = mongoose.model("blog", BlogSchema);
