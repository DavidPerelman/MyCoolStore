import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import classes from './OrderProducts.module.css';

const OrderProducts = ({ products }) => {
  console.log(products);
  const productsList =
    products &&
    products.map((product) => <ProductItem product={product.product} />);

  return (
    // <section>
    //   <ul>{productsList}</ul>
    // </section>
    <ul className={classes.OrderProducts}>{productsList}</ul>
  );
};

export default OrderProducts;
