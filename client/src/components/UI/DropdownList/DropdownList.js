import React, { useState } from 'react';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Form from 'react-bootstrap/Form';
import { useCategoriesQuery } from '../../../hooks/useCategoriesQuery';
import classes from './DropdownList.module.css';

const DropdownList = () => {
  const { isLoading, isError, data: categories } = useCategoriesQuery();

  console.log(categories);

  return <></>;
};

export default DropdownList;
