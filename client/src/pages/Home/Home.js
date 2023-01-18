import React from 'react';
import { Link } from 'react-router-dom';
import { useProductsQuery } from '../../hooks/useProductsQuery';
import data from '../../data';
import classes from './Home.module.css';

const Home = () => {
  const { data: categories } = useProductsQuery();
  console.log(categories);
  return (
    <div>
      <h1>list products</h1>
      <div className={classes.products}>
        {data.products.map((product) => (
          <div className={classes.product} key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className={classes['product-info']}>
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>{' '}
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
