import React from 'react';
import OrderProducts from '../OrderProducts/OrderProducts';
import classes from './OrderSummary.module.css';

const OrderSummary = ({
  editable,
  onEditClick,
  onCancelEditClick,
  totalPayment,
}) => {
  const total = `$${totalPayment.toFixed(2)}`;

  return (
    <div className={classes.OrderSummary}>
      <div className={classes.total}>
        <span>Total:&nbsp;</span>
        <span>{total}</span>
      </div>
      <div className={classes.actions}>
        {!editable ? (
          <button className={classes['button--alt']} onClick={onEditClick}>
            Edit
          </button>
        ) : (
          <button
            className={classes['button--alt']}
            onClick={onCancelEditClick}
          >
            Cancel
          </button>
        )}
        <button className={classes.button}>Checkout</button>
      </div>
    </div>
  );
};

export default OrderSummary;
