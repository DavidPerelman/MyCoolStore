import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import classes from './OrderProducts.module.css';

const OrderProducts = ({ products }) => {
  console.log(products);
  const productsList =
    products &&
    products.map((product) => <ProductItem product={product.product} />);

  return (
    <section>
      <div className={classes.productsContainer}>
        <ul>{productsList}</ul>
      </div>
    </section>
  );
};

export default OrderProducts;
