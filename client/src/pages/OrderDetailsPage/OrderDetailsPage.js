import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleOrder } from '../../hooks/useOrdersQuery';
import classes from './OrderDetailsPage.module.css';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const { isLoading, error, data: order } = useGetSingleOrder(orderId);
  console.log(order);

  return <div>{orderId}</div>;
};

export default OrderDetailsPage;
