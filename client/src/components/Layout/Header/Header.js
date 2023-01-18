import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <Link to='/'>MyCoolStore</Link>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
