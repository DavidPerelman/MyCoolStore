import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import classes from './OrderProducts.module.css';

const OrderProducts = ({ products, editable }) => {
  const productItemAddHandler = (product) => {
    console.log(product);
    // cartCtx.addCartItemAmount(item);
  };

  const productItemRemoveHandler = (product) => {
    console.log(product);
    // cartCtx.removeCartItemAmount(item);
  };

  //   console.log(products);
  const productsList =
    products &&
    products.map((product) => (
      <ProductItem
        product={product.product}
        editable={editable}
        amount={product.productQuantity}
        onAdd={productItemAddHandler.bind(null, product)}
        onRemove={productItemRemoveHandler.bind(null, product)}
      />
    ));

  return (
    // <section>
    //   <ul>{productsList}</ul>
    // </section>
    <ul className={classes.OrderProducts}>{productsList}</ul>
  );
};

export default OrderProducts;
