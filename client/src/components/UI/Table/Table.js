import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const Table = () => {
  const columns = [
    {
      name: 'No.',
      selector: (row) => row.orderNumber,
    },
    {
      name: 'Created',
      selector: (row) => row.created,
    },
    {
      name: 'Products',
      selector: (row) => row.Products,
    },
    {
      name: 'Total',
      selector: (row) => row.totalPayment,
    },
    {
      name: 'Is Paid',
      selector: (row) => row.isPaid.isPaid,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
    },
  ];

  const tableData = [
    {
      id: 1,
      orderNumber: 1,
      user: '1',
      created: '22/01/2023',
      products: [
        {
          _id: '1',
          productQuantity: 2,
          totalPrice: 150,
        },
        {
          _id: '2',
          productQuantity: 2,
          totalPrice: 150,
        },
        {
          _id: '3',
          productQuantity: 2,
          totalPrice: 150,
        },
        {
          _id: '4',
          productQuantity: 2,
          totalPrice: 150,
        },
      ],
      discount: 0,
      totalPayment: 300,
      isPaid: { isPaid: false, stripe_payment_id: '11' },
      isOpen: true,
      status: 'open',
    },
    {
      id: 2,
      orderNumber: 2,
      user: '1',
      created: '22/01/2023',
      products: [
        {
          _id: '1',
          productQuantity: 2,
          totalPrice: 150,
        },
        {
          _id: '2',
          productQuantity: 2,
          totalPrice: 150,
        },
        {
          _id: '3',
          productQuantity: 2,
          totalPrice: 150,
        },
        {
          _id: '4',
          productQuantity: 2,
          totalPrice: 150,
        },
      ],
      discount: 0,
      totalPayment: 300,
      isPaid: { isPaid: false, stripe_payment_id: '11' },
      isOpen: true,
      status: 'open',
    },
  ];

  //   return;
  return (
    <>
      ffdf
      <DataTable columns={columns} data={tableData} />
    </>
  );
};

export default Table;
