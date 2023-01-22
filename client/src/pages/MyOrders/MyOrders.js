import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../components/UI/Table/Table';
import { useGetAllUserOrders } from '../../hooks/useOrdersQuery';
import classes from './MyOrders.module.css';

const MyOrders = () => {
  const filterInputRef = useRef();
  const [filterText, setFilterText] = useState('');

  const { userId } = useParams();

  const { isLoading, error, data: orders } = useGetAllUserOrders(userId);

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

  // first filter
  const filter = (item) =>
    (item.orderNumber &&
      item.orderNumber.toLowerCase().includes(filterText.toLowerCase())) ||
    (item.created &&
      item.created.toLowerCase().includes(filterText.toLowerCase())) ||
    (item.status &&
      item.status.toLowerCase().includes(filterText.toLowerCase()));

  const ordersData =
    orders &&
    orders.filter(filter).map((order) => {
      return {
        orderNumber: order.orderNumber,
        created: order.created,
        totalPayment: order.totalPayment,
        status: order.status,
      };
    });

  const handleChange = (e) => {
    setFilterText(e.target.value);
    console.log(filterText);
  };

  const handleClear = () => {
    console.log('handleClear');
    console.log(filterText);
    if (filterText) {
      setFilterText('');
      filterInputRef.current.value = '';
    }
  };

  return (
    <div className={classes.MyOrders}>
      <Table
        filterInputRef={filterInputRef}
        columns={columns}
        tableData={ordersData}
        isLoading={isLoading}
        // filterText={filterText}
        handleChange={handleChange}
        handleClear={handleClear}
      />
    </div>
  );
};

export default MyOrders;
