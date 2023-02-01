import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './SearchBar.module.css';

const SearchBar = ({
  id,
  searchBar,
  setSearchBar,
  searchBarInputRef,
  placeholder,
  data,
}) => {
  const navigate = useNavigate();
  const [filteredData, setfilteredData] = useState(data);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    const newFilter = data.filter((value) => {
      if (id === 'products') {
        return value.title.toLowerCase().includes(searchWord.toLowerCase());
      } else {
        return value.name.toLowerCase().includes(searchWord.toLowerCase());
      }
    });
    setfilteredData(newFilter);
  };

  const dataItemClick = (_id) => {
    if (id === 'products') {
      navigate(`/product/${_id}`);
      setSearchBar(null);
    } else {
      navigate(`/products/${_id}`);
      setSearchBar(null);
    }
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchInputs}>
        <input
          data-id={id}
          type='text'
          ref={searchBarInputRef}
          placeholder={placeholder}
          onChange={handleFilter}
        />
      </div>
      {id === searchBar && (
        <div className={classes.dataResults}>
          {filteredData.map((value, key) => (
            <div
              className={classes.dataItem}
              key={key}
              onClick={() => dataItemClick(value._id)}
            >
              <Link to={`/product/${value._id}`}>
                {id === 'products' ? value.title : value.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
