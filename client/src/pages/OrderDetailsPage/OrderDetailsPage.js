import React from 'react';
import { useParams } from 'react-router-dom';
import OrderProducts from '../../components/Order/OrderProducts/OrderProducts';
import OrderSummary from '../../components/Order/OrderSummary/OrderSummary';
import { useGetSingleOrder } from '../../hooks/useOrdersQuery';
import classes from './OrderDetailsPage.module.css';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const { isLoading, error, data: order } = useGetSingleOrder(orderId);
  //   console.log(order.products);

  return (
    <div className={classes.OrderDetailsPage}>
      <OrderProducts products={order && order.products} />
      <OrderSummary />
    </div>
  );
};

export default OrderDetailsPage;
