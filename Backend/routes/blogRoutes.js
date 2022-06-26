const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.post('/', blogController.blog_create_post);
router.get('/', blogController.get_all_blogs);
router.delete('/:id', blogController.delete_blog);
router.put('/', blogController.update_blog);




module.exports = router;