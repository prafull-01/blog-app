const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    body:{
      type: String,
      required: true,
    },
    coverImageUrl:{
        type: String,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,  //refer the user object id
        ref: 'user', 
    },
    
  },{timestamps: true});

const Blog= mongoose.model("blog",blogSchema);

module.exports = Blog;