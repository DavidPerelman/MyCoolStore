const router = require('express').Router();
const {
  createOrder,
  getAllUserOrders,
  getSingleOrder,
} = require('../controllers/ordersController');
const { authenticate } = require('../middleware/authenticate');

router.post('/user/create', authenticate, createOrder);
router.get('/user/all', authenticate, getAllUserOrders);
router.get('/:orderId/get', getSingleOrder);

module.exports = router;
