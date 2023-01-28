import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classes from './SearchBar.module.css';

const SearchBar = ({ placeholder, data }) => {
  const [show, setShow] = useState(false);
  const [filteredData, setfilteredData] = useState(data);

  useEffect(() => {
    window.addEventListener('click', function (e) {
      if (e.target.id === 'SearchBarInput') {
        // Clicked in input
        setShow(true);
      } else {
        // Clicked outside the input
        setShow(false);
      }
    });
  }, []);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setfilteredData(newFilter);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchInputs}>
        <input
          type='text'
          placeholder={placeholder}
          id='SearchBarInput'
          onChange={handleFilter}
        />
      </div>
      {show && (
        <div className={classes.dataResults}>
          {filteredData.map((value, key) => (
            <div className={classes.dataItem} key={key}>
              <Link to={`/products/${value._id}`}>
                {value.name.charAt(0).toUpperCase() + value.name.slice(1)}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
