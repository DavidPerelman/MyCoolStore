import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderProducts from '../../components/Order/OrderProducts/OrderProducts';
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import { useGetSingleOrder } from '../../hooks/useOrdersQuery';
import classes from './OrderDetailsPage.module.css';
import OrderContext from '../../store/order-context';

const OrderDetailsPage = () => {
  const orderCtx = useContext(OrderContext);
  const { orderId } = useParams();
  const [editable, setEditable] = useState(false);
  const { isLoading, error, data: order } = useGetSingleOrder(orderId);

  const editOrderHandler = () => {
    orderCtx.makeOrderCopy(order.products);
    setEditable(true);
  };

  const cancelEditOrderHandler = () => {
    setEditable(false);
  };

  let content;

  if (order) {
    content = (
      <div className={classes.container}>
        <OrderProducts products={order && order.products} editable={editable} />
        <OrderSummary
          editable={editable}
          totalPayment={order && order.totalPayment}
          onEditClick={editOrderHandler}
          onCancelEditClick={cancelEditOrderHandler}
        />
      </div>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  return (
    <div className={classes.OrderDetailsPage}>
      <section>
        {/* <div className={classes.container}> */}
        {content}
      </section>
    </div>
  );
};

export default OrderDetailsPage;
