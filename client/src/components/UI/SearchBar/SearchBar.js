import React from 'react';
import classes from './SearchBar.module.css';

const SearchBar = ({ placeholder, data }) => {
  console.log(data);
  return (
    <div className={classes.search}>
      <div className={classes.searchInput}>
        <input type='text' placeholder={placeholder} />
        <div className={classes.searchIcon}></div>
      </div>
      <div className={classes.dataResult}></div>
    </div>
  );
};

export default SearchBar;
