const Blog = require('../models/blog');


const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then(result => {
      res.send('Blog Added');
    })
    .catch(err => {
      console.log(err);
    });
}


const get_all_blogs = (req, res) => {

  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blogs not found' });
    });
}

const delete_blog = (req, res) => {
  var id = req.params.id;

  Blog.findByIdAndDelete(id)
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

  blog_create_post, 
  get_all_blogs,
  delete_blog,
  update_blog
  
}