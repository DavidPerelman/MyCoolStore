const router = require('express').Router();
const {
  createOrder,
  getAllUserOrders,
  getSingleOrder,
} = require('../controllers/ordersController');

router.post('/:userId/create', createOrder);
router.get('/:userId/all', getAllUserOrders);
router.get('/:orderId/get', getSingleOrder);

module.exports = router;
