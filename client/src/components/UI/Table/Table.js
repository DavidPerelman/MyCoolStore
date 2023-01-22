import React from 'react';
import DataTable from 'react-data-table-component';
import Filtering from '../Filtering/Filtering';

const Table = ({
  columns,
  tableData,
  isLoading,
  handleClear,
  handleChange,
  filterInputRef,
}) => {
  const handleSelected = ({ selectedRows }) => {
    console.log(selectedRows);
  };

  const disabledCriteria = (selectedRows) => {
    if (selectedRows.isOpen === true) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <Filtering
        handleChange={handleChange}
        handleClear={handleClear}
        filterInputRef={filterInputRef}
      />
      <DataTable
        columns={columns}
        data={tableData}
        fixedHeader={true}
        fixedHeaderScrollHeight='300px'
        progressPending={isLoading}
        // defaultSortFieldId={1}
        selectableRows={true}
        onSelectedRowsChange={handleSelected}
        selectableRowDisabled={disabledCriteria}
      />
    </>
  );
};

export default Table;
