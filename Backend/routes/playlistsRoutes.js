const express = require('express');
const playlistsController = require('../controllers/playlistsController');

const router = express.Router();

router.post('/', playlistsController.video_create_playlist);
router.get('/', playlistsController.get_all_playlists);
router.get('/rootPlaylists', playlistsController.all_root_playlists);
router.get('/childPlaylists/:id', playlistsController.child_playlists);


router.delete('/:id', playlistsController.delete_blog);
router.put('/', playlistsController.update_blog);




module.exports = router;