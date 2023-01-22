import React from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../components/UI/Table/Table';
import { useGetAllUserOrders } from '../../hooks/useOrdersQuery';

const MyOrders = () => {
  const { userId } = useParams();

  const { isLoading, error, data: orders } = useGetAllUserOrders(userId);

  return (
    <div>
      <Table />
    </div>
  );
};

export default MyOrders;
