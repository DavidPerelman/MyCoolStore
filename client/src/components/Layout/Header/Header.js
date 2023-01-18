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
import Cart from '../../Cart/Cart/Cart';
import User from '../../Users/User/User';

const Header = () => {
  // const isLoggedIn = getAuth().currentUser;
  // console.log(isLoggedIn);

  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const isLoggedIn = authCtx.currentUser;

  const showCartHandler = () => {
    cartCtx.showCart();
  };

  const closeCartHandler = () => {
    cartCtx.hideCart();
  };

  const showUserModalHandler = () => {
    authCtx.showUserModal();
  };

  const closeUserModalHandler = () => {
    console.log('dsd');
    console.log(authCtx.userModalIsShown);
    authCtx.hideUserModal();
  };

  console.log(cartCtx);

  return (
    <div className='d-flex flex-column site-container'>
      {cartCtx.cartIsShown && <Cart onCloseCart={closeCartHandler} />}
      {authCtx.userModalIsShown && (
        <User onCloseUserModal={closeUserModalHandler} />
      )}
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
