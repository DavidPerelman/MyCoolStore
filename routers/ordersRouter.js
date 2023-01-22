const router = require('express').Router();
const { createOrder } = require('../controllers/ordersController');

router.post('/:userId/create', createOrder);

module.exports = router;
