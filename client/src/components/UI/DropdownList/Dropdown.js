import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';

const Dropdown = ({ categories }) => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const myDropdown = useRef();
  const dropdownInput = useRef();

  useEffect(() => {
    window.addEventListener('click', function (e) {
      console.log(categories);

      if (e.target.id === 'myInput') {
        // Clicked in myInput
        myDropdown.current.classList.value = 'dropdown-content show';
      } else {
        // Clicked outside the myInput
        myDropdown.current.classList.value = 'dropdown-content';
      }
    });
  }, []);

  const filterFunction = (e) => {
    let filteredArray = categories.categories.filter((category) =>
      category.name.includes(e.target.value)
    );

    setFilteredCategories(filteredArray);
  };

  const onCategoryClick = () => {
    myDropdown.current.value('');
  };

  return (
    <div className='dropdown'>
      <input
        ref={dropdownInput}
        type='text'
        placeholder='Search Category..'
        id='myInput'
        onChange={filterFunction}
      />
      <div ref={myDropdown} id='myDropdown' className='dropdown-content'>
        {categories &&
          filteredCategories.map((cat) => (
            <Link to={`/products/${cat._id}`} onClick={onCategoryClick}>
              {cat.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Dropdown;
