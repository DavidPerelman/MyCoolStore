import React from 'react';
import classes from './ProductItem.module.css';

const ProductItem = ({ product }) => {
  const price = `$${product.price.toFixed(2)}`;

  return (
    <li className={classes.product}>
      <div className={classes.image}>
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className={classes.content}>
        <h3>{product.title}</h3>
        <div className={classes.description}>{product.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div></div>
    </li>
  );
};

export default ProductItem;
