import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import classes from './Header.module.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Icon from '../../UI/Icon/Icon';
import AuthContext from '../../../store/auth-context';
import { getAuth } from 'firebase/auth';
import CartContext from '../../../store/cart-context';

const Header = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);

  const isLoggedIn = getAuth().currentUser;

  const showCartHandler = () => {
    cartCtx.showCart();
  };

  const showUserModalHandler = () => {
    authCtx.showUserModal();
  };

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
          <div className={classes.icons}>
            <Icon
              type='fa-shopping-cart'
              count={true}
              amount={0}
              onClick={showCartHandler}
            />
            <Icon
              type='fa-user'
              onClick={showUserModalHandler}
              isLoggedIn={isLoggedIn}
            />
          </div>
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
