const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const playlistsRoutes = require('./routes/playlistsRoutes');
const videoRoutes = require('./routes/videoRoutes');



var cors = require('cors')

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb://localhost:27017/BlogProject";

mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})
  .then(result => app.listen(3001))
  .catch(err => console.log(err));

  app.use(cors())

// middleware & static files
app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});



// blog routes
app.use('/blogs', blogRoutes);
app.use('/auth', userRoutes);
app.use('/categories',categoriesRoutes)
app.use('/playlists',playlistsRoutes)
app.use('/videos',videoRoutes)



// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});