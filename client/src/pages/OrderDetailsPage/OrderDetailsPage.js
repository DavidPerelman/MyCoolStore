import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderProducts from '../../components/Order/OrderProducts/OrderProducts';
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary';
import { useGetSingleOrder } from '../../hooks/useOrdersQuery';
import classes from './OrderDetailsPage.module.css';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [editable, setEditable] = useState(false);
  const { isLoading, error, data: order } = useGetSingleOrder(orderId);
  //   console.log(order);

  const editOrderHandler = () => {
    setEditable(true);
  };

  const cancelEditOrderHandler = () => {
    setEditable(false);
  };

  return (
    <div className={classes.OrderDetailsPage}>
      <section>
        <div className={classes.container}>
          <OrderProducts
            products={order && order.products}
            editable={editable}
          />
          <OrderSummary
            editable={editable}
            totalPayment={order && order.totalPayment}
            onEditClick={editOrderHandler}
            onCancelEditClick={cancelEditOrderHandler}
          />
        </div>
      </section>
    </div>
  );
};

export default OrderDetailsPage;
