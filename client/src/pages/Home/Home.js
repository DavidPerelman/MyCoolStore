import React from 'react';
import { Link } from 'react-router-dom';
import { useProductsQuery } from '../../hooks/useProductsQuery';
import classes from './Home.module.css';

const Home = () => {
  const { data: products } = useProductsQuery();
  console.log(products);

  return (
    <div>
      <h1>list products</h1>
      <div className={classes.products}>
        {products &&
          products.map((product) => (
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
          ))}
      </div>
    </div>
  );
};

export default Home;
