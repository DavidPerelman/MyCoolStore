import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import classes from './Header.module.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Icon from '../../UI/Icon/Icon';
import AuthContext from '../../../store/auth-context';
import CartContext from '../../../store/cart-context';
import Cart from '../../Cart/Cart/Cart';
import User from '../../Users/User/User';
import DropdownList from '../../UI/DropdownList/DropdownList';
import Dropdown from '../../UI/DropdownList/Dropdown';
import { useCategoriesQuery } from '../../../hooks/useCategoriesQuery';

const Header = () => {
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const isLoggedIn = authCtx.authorized;
  const { isLoading, isError, data: categories } = useCategoriesQuery();

  console.log(isLoggedIn);

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
    authCtx.hideUserModal();
  };

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
          <Dropdown categories={categories} />
          {/* <DropdownList /> */}
          <div className={classes.icons}>
            <Icon
              type='fa-shopping-cart'
              count={true}
              amount={cartCtx.items.length}
              onClick={showCartHandler}
              size='lg'
            />
            <Icon
              type='fa-user'
              onClick={showUserModalHandler}
              isLoggedIn={isLoggedIn}
              size='lg'
            />
          </div>
        </Navbar>
      </header>
      <main className={classes.main}>
        <Outlet />
      </main>
      {/* <footer>footer</footer> */}
    </div>
  );
};

export default Header;
