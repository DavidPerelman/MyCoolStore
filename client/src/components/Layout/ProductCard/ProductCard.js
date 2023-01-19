import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../../UI/Rating/Rating';
import classes from './ProductCard.module.css';
import CartContext from '../../../store/cart-context';
import Icon from '../../UI/Icon/Icon';

const ProductCard = ({ product }) => {
  const cartCtx = useContext(CartContext);

  const price = `$${product.price.toFixed(2)}`;

  const existingCartItemIndex = cartCtx.items.findIndex((cartItem) => {
    return product._id === cartItem.product._id;
  });

  const existingCartItem = cartCtx.items[existingCartItemIndex];
  let existingCartItemId;

  if (existingCartItem) {
    existingCartItemId = Object.values(existingCartItem)[0]._id;
  }

  console.log(existingCartItemId);

  const addToCartHandler = () => {
    cartCtx.addItem(product);
  };

  return (
    <Card className={classes.card}>
      <Link to={`/product/${product._id}`}>
        <img
          src={product.thumbnail}
          className='card-img-top'
          alt={product.title}
        />
      </Link>
      <Card.Body className={classes['card-body']}>
        <Link to={`/product/${product._id}`}>
          <Card.Title className={classes['card-title']}>
            {product.title}
          </Card.Title>
        </Link>
        <Rating rating={product.rating} />
        <Card.Body className={classes['card-footer']}>
          <Card.Text>{price}</Card.Text>
          {existingCartItemId !== product._id ? (
            <Icon
              type='fa-solid fa-cart-plus'
              onClick={(e) => addToCartHandler(e)}
              size='lg'
            />
          ) : (
            <span className={classes['in-cart']}>In Cart</span>
          )}
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
