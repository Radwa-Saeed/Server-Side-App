const mongoose = require("mongoose");
const postsSchema = require("../schema/postSchema");
const Post = mongoose.model('Post',postsSchema);
module.exports=Post


