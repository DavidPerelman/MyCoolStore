const router = require('express').Router();
const {
  getAllCategories,
  deleteAllCategories,
  getCategory,
  createCategories,
} = require('../controllers/categoriesController');

router.get('/', getAllCategories);
router.get('/getCategory/:categoryId', getCategory);
router.get('/delete', deleteAllCategories);
router.get('/create', createCategories);

module.exports = router;
