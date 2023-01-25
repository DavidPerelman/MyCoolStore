const router = require('express').Router();
const {
  createOrder,
  getAllUserOrders,
  getSingleOrder,
} = require('../controllers/ordersController');
const { authMiddlware } = require('../middleware/auth-middleware');

router.post('/:userId/create', authMiddlware, createOrder);
router.get('/user/all', authMiddlware, getAllUserOrders);
router.get('/:orderId/get', getSingleOrder);

module.exports = router;
