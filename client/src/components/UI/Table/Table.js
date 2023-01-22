import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Table = ({ columns, tableData, isLoading }) => {
  const handleSelected = ({ selectedRows }) => {
    console.log(selectedRows);
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={tableData}
        fixedHeader={true}
        fixedHeaderScrollHeight='300px'
        progressPending={isLoading}
        // defaultSortFieldId={1}
        selectableRows={true}
        onSelectedRowsChange={handleSelected}
      />
    </>
  );
};

export default Table;
