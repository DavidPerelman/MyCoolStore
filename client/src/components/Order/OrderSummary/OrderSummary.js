import React from 'react';
import OrderProducts from '../OrderProducts/OrderProducts';
import classes from './OrderSummary.module.css';

const OrderSummary = ({ totalPayment }) => {
  return (
    <div className={classes.OrderSummary}>
      <span>Total</span>
      <span>{totalPayment}</span>
    </div>
  );
};

export default OrderSummary;
