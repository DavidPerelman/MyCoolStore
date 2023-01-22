import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const Table = () => {
  const columns = [
    {
      name: 'Title',
      selector: (row) => row.title,
    },
    {
      name: 'Year',
      selector: (row) => row.year,
    },
  ];

  const tableData = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
    },
    {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
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
