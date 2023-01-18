const router = require('express').Router();
const {
  getAllCategories,
  deleteAllCategories,
  getCategory,
} = require('../controllers/categoriesController');

router.get('/', getAllCategories);
router.get('/:categoryId', getCategory);
router.get('/delete', deleteAllCategories);

module.exports = router;
