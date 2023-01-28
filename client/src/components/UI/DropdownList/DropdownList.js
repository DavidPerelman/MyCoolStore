import React, { useState } from 'react';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Form from 'react-bootstrap/Form';
import { useCategoriesQuery } from '../../../hooks/useCategoriesQuery';
import classes from './DropdownList.module.css';
import Select from 'react-select';

const DropdownList = () => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const { isLoading, isError, data: categories } = useCategoriesQuery();

  console.log(categories);
  function myFunction() {
    document.getElementById('myDropdown').classList.toggle('show');
  }

  return (
    <>
      <div class='dropdown'>
        <button onclick={myFunction} class='dropbtn'>
          Dropdown
        </button>
        <div id='myDropdown' class='dropdown-content'>
          <input type='text' placeholder='Search..' id='myInput' />
          <a href='#about'>About</a>
          <a href='#base'>Base</a>
          <a href='#blog'>Blog</a>
          <a href='#contact'>Contact</a>
          <a href='#custom'>Custom</a>
          <a href='#support'>Support</a>
          <a href='#tools'>Tools</a>
        </div>
      </div>
      {/* <form>
        <label for='categories'>Choose a category:</label>
        <select id='categories' name='categories'>
          {categories &&
            categories.categories.map((category, i) => (
              <option key={i} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </form> */}
    </>
  );
};

export default DropdownList;
