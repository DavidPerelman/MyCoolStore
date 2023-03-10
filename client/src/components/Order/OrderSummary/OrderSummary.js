import React, { useContext } from 'react';
import OrderContext from '../../../store/order-context';
import classes from './OrderSummary.module.css';

const OrderSummary = ({
  editable,
  onEditClick,
  onCancelEditClick,
  totalPayment,
}) => {
  const orderCtx = useContext(OrderContext);

  const total = `$${
    editable
      ? orderCtx.totalAmount.toFixed(2)
      : totalPayment && totalPayment.toFixed(2)
  }`;

  console.log(orderCtx.totalAmount);
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
        {!editable ? (
          <button className={classes.button}>Checkout</button>
        ) : (
          <button className={classes.button} onClick={onCancelEditClick}>
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
