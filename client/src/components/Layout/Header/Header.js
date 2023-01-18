import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import classes from './Header.module.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <div className='d-flex flex-column site-container'>
      <header className={classes.header}>
        <Navbar className={classes.header}>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand className={classes['site-title']}>
                MyCoolStore
              </Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default Header;
