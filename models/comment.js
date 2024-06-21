const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    content: {
      type: String,
      required: true,
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,  //refer the user object id
        ref: 'blog', 
    },
    
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,  //refer the user object id
        ref: 'user', 
    },
    
  },{timestamps: true});

const Comment= mongoose.model("comment",commentSchema);

module.exports = Comment;