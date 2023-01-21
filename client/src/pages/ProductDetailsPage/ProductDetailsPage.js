import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSingleProductQuery } from '../../hooks/useProductsQuery';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import classes from './ProductDetailsPage.module.css';
import Rating from '../../components/UI/Rating/Rating';
import Carousel from '../../components/UI/Carousel/Carousel';
import Icon from '../../components/UI/Icon/Icon';
import CartContext from '../../store/cart-context';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { isLoading, error, data: product } = useSingleProductQuery(productId);
  const cartCtx = useContext(CartContext);

  const price = `$${product && product.price.toFixed(2)}`;
  const existingCartItemIndex = cartCtx.items.findIndex((cartItem) => {
    return product && product._id === cartItem.product._id;
  });

  const existingCartItem = cartCtx.items[existingCartItemIndex];
  let existingCartItemId;

  if (existingCartItem) {
    existingCartItemId = Object.values(existingCartItem)[0]._id;
  }

  const addToCartHandler = () => {
    cartCtx.addItem(product);
  };

  let content;

  if (product) {
    content = (
      <Card className={classes.card}>
        <Row className={classes.row}>
          <Col>
            <ListGroup variant='flush'>
              <ListGroup.Item
                className={`${classes['list-group-item']} ${classes['brand']}`}
              >
                <Icon type='fa-brands fa-font-awesome' size='2xs' />
                {product.brand}
                {/* <p>{product.brand}</p> */}
              </ListGroup.Item>
              <ListGroup.Item>
                <h1>{product.title}</h1>
              </ListGroup.Item>
              <ListGroup.Item className={classes['list-group-item']}>
                <p>{product.category}</p>
              </ListGroup.Item>
              <ListGroup.Item className={classes['list-group-item']}>
                <p>{product.description}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating rating={product.rating} />
              </ListGroup.Item>
              <ListGroup.Item className={classes['price-list-group']}>
                Price : {price}{' '}
                <span className={classes['price-action']}>
                  {existingCartItemId !== product._id ? (
                    <Icon
                      type='fa-solid fa-cart-plus'
                      onClick={(e) => addToCartHandler(e)}
                      size='sm'
                    />
                  ) : (
                    <h4>
                      <span className={classes['in-cart']}>In Cart</span>
                    </h4>
                  )}
                </span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <Carousel images={product.images} />
          </Col>
        </Row>
      </Card>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = (
      <Row className={classes.row}>
        <LoadingSpinner />
      </Row>
    );
  }

  console.log(product);

  return (
    <div className={classes.ProductDetailsPage}>
      {content}
      {/* <Container>{content}</Container> */}
    </div>
  );
};

export default ProductDetailsPage;
