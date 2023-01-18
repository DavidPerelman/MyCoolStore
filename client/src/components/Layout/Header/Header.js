import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import classes from './Header.module.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <Navbar className={classes.header}>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>MyCoolStore</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
