const Blog = require("../models/blog");
const Playlist = require("../models/playlist.js");

const video_create_playlist = (req, res) => {
  const playlist = new Playlist(req.body);

  playlist
    .save()
    .then((result) => {
      res.send("category Added");
    })
    .catch((err) => {
      console.log(err);
    });
};

async function addSubmenu(item) {
  const array = await Playlist.find({ parent: item._id }).then((submenus) => {
    // const array2 = submenus.map((s) => ({name:s.name, submenu: await addSubmenu(s)}));
    //  array = ["a"]

    // console.log("array",array)

    // // return "array"
    // console.log("array", array)

    return submenus.map(async (s) => {
      const check = await Playlist.find({ parent: s._id });
      if (check.length == 0) {
        return { name: s.name, _id:s._id };
      } else return { _id:s._id , name: s.name, submenu: await addSubmenu(s) };
    });
  });

  return Promise.all(array);
}

const get_all_playlists = (req, res) => {
  Playlist.find({ parent: "null" })
    .then(async (result) => {
      const promise = result.map(async (r) => ({
        name: r.name,
        submenu: await addSubmenu(r),
        _id:r._id
      }));

      const re = await Promise.all(promise);
      return res.send(re);
    })

    .catch((err) => {
      console.log(err);
      res.render("404", { title: "playlists not found" });
    });
};



const all_root_playlists = (req, res) => {

  Playlist.find({parent:"null"})
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
    res.render('404', { title: 'Blogs not found' });
  });
}

const child_playlists = (req,res)=>{

  console.log(req.params)

  Playlist.find({parent:req.params.id})
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

  Playlist.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const update_blog = (req, res) => {
  console.log("title", req.body);
  Blog.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        title: req.body.title,
        ShortDescription: req.body.ShortDescription,
        DetailedDescription: req.body.DetailedDescription,
        BlogText: req.body.BlogText,
      },
    }
  ).then(res.send("updated"));
};

module.exports = {
  video_create_playlist,
  get_all_playlists,
  all_root_playlists,
  child_playlists,
  delete_blog,
  update_blog,
};
