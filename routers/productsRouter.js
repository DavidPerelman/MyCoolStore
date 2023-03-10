const router = require('express').Router();
const {
  getAllProducts,
  getSingleProduct,
  getAllProductsByCategory,
  deleteAllProducts,
  getContainerProductsByCategory,
  getEditProductsCategory,
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/product/:productId', getSingleProduct);
router.get('/category/:categoryId', getAllProductsByCategory);
router.get('/category/:categoryId/:limit', getContainerProductsByCategory);
router.get('/delete', deleteAllProducts);
router.get('/editProductsCategory', getEditProductsCategory);

module.exports = router;
