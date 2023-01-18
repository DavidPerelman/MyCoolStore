import React from 'react';
import { Link } from 'react-router-dom';
import { useProductsQuery } from '../../hooks/useProductsQuery';
import classes from './Home.module.css';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

const Home = () => {
  const { isLoading, error, data: products } = useProductsQuery();

  let content;

  if (products && products.length > 0) {
    content = products.map((product) => {
      return (
        <div className={classes.product} key={product.id}>
          <Link to={`/product/${product.id}`}>
            <img src={product.thumbnail} alt={product.title} />
          </Link>
          <div className={classes['product-info']}>
            <Link to={`/product/${product.id}`}>
              <p>{product.title}</p>{' '}
            </Link>
            <p>
              <strong>${product.price}</strong>
            </p>
            <button>Add to cart</button>
          </div>
        </div>
      );
    });
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <LoadingSpinner />;
  }

  return (
    <div>
      <div className={classes.products}>{content}</div>
    </div>
  );
};

export default Home;
