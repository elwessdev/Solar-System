const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //posts:[{  
  //  postId:{
  //    type: mongoose.Schema.Types.ObjectId,
  //    ref: 'posts'
  //  },
  //}],
  //comments:[{
  //    type: mongoose.Schema.Types.ObjectId,
  //    ref: 'comments',
  //  }
  //],
});
module.exports = mongoose.model("users", userSchema);