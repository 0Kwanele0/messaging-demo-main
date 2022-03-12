const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  fullname: {
    required: true,
    type: String,
  },
  image: {
    type: String,
  },
  username: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  bio: {
    type: String,
  },
  genre: {
    type: Array,
  },
  documents: {
    type: Array,
  },
  followers: {
    type: Array,
  },
});

module.exports = mongoose.model("users", UserModel);
