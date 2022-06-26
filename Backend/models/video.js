const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url:{
      type:String,
      required:true
    },
    playlist:{
        type:String,
        required:true
      },
      createdAt:{
        type:String,
        required:false
      }
  
  },
);

const Video = mongoose.model("video", videoSchema);
module.exports = Video;