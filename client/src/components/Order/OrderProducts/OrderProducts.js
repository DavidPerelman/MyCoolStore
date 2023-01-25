import React, { useContext } from 'react';
import OrderContext from '../../../store/order-context';
import ProductItem from '../ProductItem/ProductItem';
import classes from './OrderProducts.module.css';

const OrderProducts = ({ products, editable }) => {
  const orderCtx = useContext(OrderContext);

  // return;
  // console.log(orderCtx);
  const productItemAddHandler = (product) => {
    // console.log(product);
    orderCtx.addOrderItemAmount(product);
  };

  const productItemRemoveHandler = (product) => {
    console.log(product);
    // cartCtx.removeCartItemAmount(item);
  };

  //   console.log(products);
  // const productsList =
  //   products &&
  //   products.map((product, i) => (
  //     <ProductItem
  //       key={i}
  //       product={product.product}
  //       editable={editable}
  //       amount={product.productQuantity}
  //       onAdd={productItemAddHandler.bind(null, product)}
  //       onRemove={productItemRemoveHandler.bind(null, product)}
  //     />
  //   ));

  return (
    // <section>
    //   <ul>{productsList}</ul>
    // </section>
    <ul className={classes.OrderProducts}>
      {editable
        ? orderCtx &&
          orderCtx.copyOrderProducts.map((product, i) => (
            <>
              <ProductItem
                key={i}
                product={product.product}
                editable={editable}
                amount={product.productQuantity}
                onAdd={productItemAddHandler.bind(null, product)}
                onRemove={productItemRemoveHandler.bind(null, product)}
              />
            </>
          ))
        : products &&
          products.map((product, i) => (
            <ProductItem
              key={i}
              product={product.product}
              editable={editable}
              amount={product.productQuantity}
              onAdd={productItemAddHandler.bind(null, product)}
              onRemove={productItemRemoveHandler.bind(null, product)}
            />
          ))}
    </ul>
  );
};

export default OrderProducts;
