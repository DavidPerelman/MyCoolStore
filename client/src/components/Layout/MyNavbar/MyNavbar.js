import React, { useContext, useEffect, useRef, lazy, Suspense } from 'react';
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
import { useAllProductsQuery } from '../../../hooks/useProductsQuery';
import { useLocation } from 'react-router-dom';

const SearchBar = lazy(() => import('../../UI/SearchBar/SearchBar'));

const MyNavbar = () => {
  const location = useLocation();
  const [showLinks, setShowLinks] = useState(false);
  const authCtx = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const isLoggedIn = authCtx.authorized;
  const { data: categories } = useCategoriesQuery();
  const { data: products } = useAllProductsQuery();
  const searchProductsInputRef = useRef();
  const searchCategoriesInputRef = useRef();
  const [searchBar, setSearchBar] = useState(null);

  const handleSearchBar = (id) => {
    if (searchBar === id || (searchBar && id === undefined)) {
      setSearchBar(null);
    }
    if (searchBar !== id) {
      setSearchBar(id);
    }

    if (id === 'categories') {
      searchProductsInputRef.current.value = '';
    } else {
      searchCategoriesInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const handleClick = ({ target }) => {
      handleSearchBar(target.dataset.id);
    };

    document.addEventListener('click', handleClick);

    if (location !== '/') {
      setShowLinks(false);
    } else {
      setShowLinks(!showLinks);
    }
  }, [location.pathname]);

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
              <Suspense>
                <SearchBar
                  id='products'
                  searchBar={searchBar}
                  setSearchBar={setSearchBar}
                  searchBarInputRef={searchProductsInputRef}
                  data={products}
                  placeholder='Search Product...'
                />
              </Suspense>
            )}
            {categories && (
              <Suspense>
                <SearchBar
                  searchBarInputRef={searchCategoriesInputRef}
                  searchBar={searchBar}
                  setSearchBar={setSearchBar}
                  id='categories'
                  data={categories.categories}
                  placeholder='Search Category...'
                />
              </Suspense>
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

export default React.memo(MyNavbar);
