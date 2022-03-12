const mongo = require("mongoose");

const Note = new mongo.Schema({
  userId: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  file: {
    type: String,
  },
  likes: {
    type: Number,
  },
  downloads:{
    type: Number
  },},{
  timestamps: true
});

module.exports = mongo.model("documents", Note);
