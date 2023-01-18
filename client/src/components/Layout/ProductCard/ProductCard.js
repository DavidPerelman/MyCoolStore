import React from 'react';
import { Link } from 'react-router-dom';
import classes from './ProductCard.module.css';

const ProductCard = ({ product }) => {
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
};

export default ProductCard;
