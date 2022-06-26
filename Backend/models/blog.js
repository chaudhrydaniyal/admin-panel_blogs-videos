const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ShortDescription: {
      type: String,
      required: true,
    },
  
    BlogCategory: {
      type: String,
      required: true,
    },
    BlogText: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: false,
    },
  });

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
