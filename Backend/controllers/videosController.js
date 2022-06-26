const Video = require('../models/video');


const upload_video = (req, res) => {
  const video = new Video(req.body);

  video.save()
    .then(result => {
      res.send('video Added');
    })
    .catch(err => {
      console.log(err);
    });
}


const playlist_videos = (req, res) => {

  Video.find({playlist:req.params.id})
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blogs not found' });
    });
}

const delete_video = (req, res) => {
  var id = req.params.id;

  Video.findByIdAndDelete(id)
  .then(result => {
    res.json({ redirect: '/blogs' });
  })
  .catch(err => {
    console.log(err);
  });

}


const update_blog = (req, res) => {

console.log("title",req.body)
  Blog.findOneAndUpdate(
    { _id: req.body._id },
    {
      
      $set: {
        title:req.body.title,
        ShortDescription: req.body.ShortDescription,
        DetailedDescription:req.body.DetailedDescription,
        BlogText: req.body.BlogText
    }
    }
  ).then(res.send("updated"))

}



module.exports = {

  upload_video, 
  playlist_videos,
  delete_video,
  update_blog
  
}