const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent:{
      type:String,
      required:false
    },
    level:{
      type:Number,
      required:false
    },
    noOfVideos:{
      type:Number,
      required:false
    },
    
    createdAt:{
      type:String,
      required:false
    }
  
  
  },
);

const Playlist = mongoose.model("playlist", playlistSchema);
module.exports = Playlist;
