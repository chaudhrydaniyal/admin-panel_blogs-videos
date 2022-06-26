const Blog = require('../models/blog');
const Category = require('../models/category');


const blog_create_category = (req, res) => {
  const category = new Category(req.body);

  category.save()
    .then(result => {
      res.send('category Added');
    })
    .catch(err => {
      console.log(err);
    });
}


const get_all_categories = (req, res) => {

    Category.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blogs not found' });
    });
}


const delete_category = (req, res) => {
var id = req.params.id;

Category.findByIdAndDelete(id)
.then(result => {
  res.send("category deleted");
})
.catch(err => {
  console.log(err);
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

  blog_create_category, 
  get_all_categories,
  delete_category,
  delete_blog,
  update_blog
  
}