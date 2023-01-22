import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Table = ({ columns, tableData, isLoading }) => {
  //   return;
  return (
    <>
      <DataTable
        columns={columns}
        data={tableData}
        fixedHeader={true}
        fixedHeaderScrollHeight='300px'
        progressPending={isLoading}
      />
    </>
  );
};

export default Table;
