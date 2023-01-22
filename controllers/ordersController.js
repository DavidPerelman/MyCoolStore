const User = require('../models/userModel');
const Order = require('../models/orderModel');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const createOrder = async (req, res) => {
  try {
    const { orderData, userId, totalPayment } = req.body;

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

module.exports = { createOrder };
