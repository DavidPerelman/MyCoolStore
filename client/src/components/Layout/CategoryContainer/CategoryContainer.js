import React from 'react';
import { Link } from 'react-router-dom';
import { useContainerProductsQuery } from '../../../hooks/useProductsQuery';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import classes from './CategoryContainer.module.css';

const CategoryContainer = ({ category }) => {
  const {
    isLoading,
    error,
    data: products,
  } = useContainerProductsQuery(category._id);

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

  console.log(products);

  return (
    <div>
      <h1>
        Our {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
      </h1>
      <div className={classes.products}>{content}</div>
    </div>
  );
};

export default CategoryContainer;
