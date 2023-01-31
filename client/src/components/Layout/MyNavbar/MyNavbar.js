import React, { useContext, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import classes from './MyNavbar.module.css';
import Icon from '../../UI/Icon/Icon';
import { useState } from 'react';
import Hamburger from '../../UI/Hamburger/Hamburger';
import AuthContext from '../../../store/auth-context';
import CartContext from '../../../store/cart-context';
import { useCategoriesQuery } from '../../../hooks/useCategoriesQuery';
import User from '../../Users/User/User';
import Cart from '../../Cart/Cart/Cart';
import SearchCategory from '../../UI/SearchBar/SearchCategory';
import SearchProducts from '../../UI/SearchBar/SearchProducts';
import { useAllProductsQuery } from '../../../hooks/useProductsQuery';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const MyNavbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const isLoggedIn = authCtx.authorized;
  const { data: categories } = useCategoriesQuery();
  const { data: products } = useAllProductsQuery();
  console.log(useLocation().pathname);

  useEffect(() => {
    setShowLinks(!showLinks);
  }, [useLocation().pathname]);

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
      <div className={classes.MyNavbar}>
        <div className={classes['left-side']}>
          <Link className={classes['site-title']} to='/'>
            MyCoolStore
          </Link>
        </div>
        <div className={classes['right-side']}>
          <div
            className={classes.links}
            id={showLinks ? classes['hidden'] : ''}
          >
            {products && (
              <SearchProducts data={products} placeholder='Search Product...' />
            )}
            {categories && (
              <SearchCategory
                data={categories.categories}
                placeholder='Search Category...'
              />
            )}
          </div>
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
          <div className={classes.Hamburger}>
            <Hamburger showLinks={showLinks} setShowLinks={setShowLinks} />
          </div>
        </div>
      </div>
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default MyNavbar;
