import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../../UI/Rating/Rating';
import classes from './ProductCard.module.css';
import CartContext from '../../../store/cart-context';

const ProductCard = ({ product }) => {
  const cartCtx = useContext(CartContext);
  console.log(cartCtx);

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
        <Card.Text>${product.price}</Card.Text>
        <Button
          onClick={() => {
            cartCtx.addItem(product);
          }}
        >
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
