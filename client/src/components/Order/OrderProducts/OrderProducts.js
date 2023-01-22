import React from 'react';
import classes from './OrderProducts.module.css';

const OrderProducts = ({ products }) => {
  console.log(products);
  const productsList =
    products && products.map((product) => <li>{product.product.title}</li>);

  return (
    <section>
      <div className={classes.productsContainer}>
        <ul>{productsList}</ul>
      </div>
    </section>
  );
};

export default OrderProducts;
