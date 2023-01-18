const mongoose = require('mongoose');
const moment = require('moment-timezone');

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  role: { type: String, required: true, default: 'customer' },
  registerDate: {
    type: String,
    required: true,
    default: () => moment().format('DD/MM/YYYY HH:mm'),
  },
});

module.exports = mongoose.model('User', userSchema);
