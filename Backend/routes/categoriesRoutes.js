const express = require('express');
const categoriesController = require('../controllers/categoriesController');

const router = express.Router();

router.post('/', categoriesController.blog_create_category);
router.get('/', categoriesController.get_all_categories);
router.delete('/:id', categoriesController.delete_category);
router.put('/', categoriesController.update_blog);




module.exports = router;