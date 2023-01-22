import React from 'react';
import classes from './ProductItem.module.css';

const ProductItem = ({ product }) => {
  const price = `$${product.price.toFixed(2)}`;

  return (
    <li className={classes.product}>
      <div>
        <h3>{product.title}</h3>
        <div className={classes.description}>{product.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div></div>
    </li>
  );
};

export default ProductItem;
