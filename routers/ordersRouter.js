const router = require('express').Router();
const {
  createOrder,
  getAllUserOrder,
} = require('../controllers/ordersController');

router.post('/:userId/create', createOrder);
router.get('/:userId/all', getAllUserOrder);

module.exports = router;
