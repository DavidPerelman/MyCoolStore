import React from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../components/UI/Table/Table';
import { useGetAllUserOrders } from '../../hooks/useOrdersQuery';

const MyOrders = () => {
  const { userId } = useParams();

  const { isLoading, error, data: orders } = useGetAllUserOrders(userId);

  console.log(orders);

  const columns = [
    {
      name: 'No.',
      selector: (row) => row.orderNumber,
    },
    {
      name: 'Created',
      selector: (row) => row.created,
      sortable: true,
      // id: 1,
    },
    // {
    //   name: 'Products',
    //   selector: (row) => row.Products,
    // },
    {
      name: 'Total',
      selector: (row) => row.totalPayment,
      sortable: true,
    },
    // {
    //   name: 'Is Paid',
    //   selector: (row) => row.isPaid.isPaid,
    //   sortable: true,
    // },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  return (
    <div>
      <Table columns={columns} tableData={orders} isLoading={isLoading} />
    </div>
  );
};

export default MyOrders;
