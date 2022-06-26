const express = require('express');
const videosController = require('../controllers/videosController');
const playlistsController = require('../controllers/playlistsController');

const router = express.Router();

router.post('/', videosController.upload_video);
router.get('/:id', videosController.playlist_videos);
router.delete('/:id', videosController.delete_video);
router.put('/', playlistsController.update_blog);




module.exports = router;