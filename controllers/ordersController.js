const User = require('../models/userModel');
const Order = require('../models/orderModel');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const createOrder = async (req, res) => {
  try {
    const { orderData, userId, totalPayment } = req.body;

    console.log(req.user);
    for (let i = 0; i < orderData.length; i++) {
      orderData[i].product = mongoose.Types.ObjectId(
        orderData[i].product.trim()
      );
    }

    // create a new user
    const newOrder = await new Order({
      orderNumber: uuidv4(),
      user: userId,
      products: orderData,
      totalPayment: totalPayment,
    }).save();

    res.json({ order: newOrder, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getAllUserOrders = async (req, res) => {
  console.log(req.user);

  try {
    const { firebaseId } = req.user;

    const orders = await Order.find({ user: firebaseId })
      .populate('products.product')
      .exec();

    res.json({ orders: orders });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate('products.product')
      .exec();

    res.json({ order: order });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = { createOrder, getAllUserOrders, getSingleOrder };
